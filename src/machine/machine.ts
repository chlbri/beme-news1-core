import { assign } from '@xstate/immer';
import {
  createMachine,
  MachineOptionsFrom,
  send,
  StateFrom,
  StateValueFrom,
} from 'xstate';
import { NUMBERS } from '../constants';
import { assignObject } from '../helpers';
import { Context, Events, Services } from './machine.types';

export const MainMachine = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    schema: {
      context: {} as Context,
      events: {} as Events,
      services: {} as Services,
    },
    tsTypes: {} as import('./machine.typegen').Typegen0,

    id: 'main',
    initial: 'cache',
    states: {
      cache: {
        description: '',
        entry: 'defaultQuery',
        invoke: {
          src: 'fetchArticles',
          id: 'fetchArticles',
          onDone: [
            {
              target: 'work',
              actions: ['setDefaultArticles', 'setArticles'],
            },
          ],
          onError: [
            {
              target: 'work',
            },
          ],
        },
      },
      work: {
        states: {
          search: {
            initial: 'inactive',
            states: {
              inactive: {},
              active: {
                initial: 'idle',
                states: {
                  loading: {
                    description: '',
                    invoke: {
                      src: 'fetchArticles',
                      id: 'fetchArticles',
                      onDone: [
                        {
                          target: 'idle',
                          actions: 'setArticles',
                        },
                      ],
                      onError: [
                        {
                          target: 'idle',
                        },
                      ],
                    },
                    on: {
                      'SEARCH/QUERY': {
                        actions: 'search/query',
                        description: 'Forward with parameters',
                      },
                    },
                  },
                  idle: {
                    after: {
                      THROTTLE_TIME: 'loading',
                    },
                  },
                },
              },
              checking: {
                always: [
                  {
                    cond: 'hasInput',
                    target: 'active',
                  },
                  {
                    target: 'inactive',
                  },
                ],
              },
            },
            on: {
              'SEARCH/INPUT': {
                target: '.checking',
                actions: 'search/setInput',
              },
            },
          },
          navigation: {
            on: {
              'NAVIGATE/PUSH': {
                actions: ['navigation/push', 'buildHistory'],
              },
              'NAVIGATE/REPLACE': {
                actions: ['navigation/replace', 'buildHistory'],
              },
              'NAVIGATE/BACK': {
                actions: ['navigation/back', 'buildHistory'],
              },
            },
          },
          table: {
            entry: ['table/assignDefaultPageSize'],
            invoke: {
              src: 'table',
              id: 'table',
            },
            on: {
              // #region Senders
              'TABLE/SEND/CREATE': {
                actions: ['table/create'],
              },
              'TABLE/SEND/DELETE': {
                actions: ['table/delete'],
              },
              'TABLE/SEND/REMOVE': {
                actions: ['table/remove'],
              },
              'TABLE/SEND/UPDATE': {
                actions: ['table/update'],
              },
              'TABLE/SEND/SORT': {
                actions: ['table/sort'],
              },
              'TABLE/SEND/GOTO': {
                actions: ['table/goto'],
              },
              'TABLE/SEND/NEXT': {
                actions: ['table/next'],
              },
              'TABLE/SEND/PREVIOUS': {
                actions: ['table/previous'],
              },
              // #endregion
              // #region Setters
              'TABLE/SET/ARTICLES': {
                actions: [
                  'table/setAllTotal',
                  'setArticles',
                  'table/setTotal',
                  'table/setTotalPages',
                  'table/setHasNextPage',
                  'table/setHasPreviousPage',
                  'table/setCanFetchMore',
                ],
              },
              'TABLE/SET/CURRENT_PAGE': {
                actions: [
                  'table/setCurrentPage',
                  'table/setHasNextPage',
                  'table/setHasPreviousPage',
                  'table/setCanFetchMore',
                ],
              },
              'TABLE/SET/PAGE_SIZE': {
                actions: [
                  'table/setPageSize',
                  'table/setTotalPages',
                  'table/setHasNextPage',
                  'table/setHasPreviousPage',
                  'table/setCanFetchMore',
                ],
              },
              // #endregion
            },
          },
        },
        type: 'parallel',
      },
    },
  },
  {
    guards: {
      hasInput: context => {
        const input = context.search?.input;
        return !!input && input.trim().length > 0;
      },
    },
    actions: {
      defaultQuery: send('QUERY', { to: 'fetchArticles' }),

      setDefaultArticles: assign((context, { data }) => {
        context.articles = data.articles;
      }),

      setArticles: assign((context, event) => {
        const articles = event.data?.articles;
        if (articles) context.articles = articles;
      }),

      // #region Search
      'search/query': send(
        (_, args) => ({
          ...args,
          type: 'QUERY',
        }),
        { to: 'fetchArticles' },
      ),

      'search/setInput': assign((context, { input }) => {
        context.search = { input };
      }),
      // #endregion

      // #region Table

      'table/assignDefaultPageSize': assign(context => {
        context.table = {
          defaultPageSize: NUMBERS.DEFAULT_PAGE_SIZE,
          pageSize: NUMBERS.DEFAULT_PAGE_SIZE,
        };
      }),

      // #region Senders
      'table/create': send(
        (_, { article }) => ({
          type: 'CREATE',
          article,
        }),
        { to: 'table' },
      ),

      'table/delete': send(
        (_, { id }) => ({
          type: 'DELETE',
          id,
        }),
        { to: 'table' },
      ),

      'table/remove': send(
        (_, { id }) => ({
          type: 'REMOVE',
          id,
        }),
        { to: 'table' },
      ),

      'table/update': send(
        (_, { article }) => ({
          type: 'UPDATE',
          article,
        }),
        { to: 'table' },
      ),

      'table/sort': send(
        (_, { sortBy }) => ({
          type: 'SORT',
          sortBy,
        }),
        { to: 'table' },
      ),

      'table/goto': send(
        (_, { page }) => ({
          type: 'GOTO',
          page,
        }),
        { to: 'table' },
      ),

      'table/next': send('NEXT', { to: 'table' }),
      'table/previous': send('PREVIOUS', { to: 'table' }),
      // #endregion

      // #region Setters
      'table/setAllTotal': assign((context, event) => {
        const allTotal = event.data?.allTotal ?? context.table?.allTotal;
        assignObject(context.table, { allTotal });
      }),

      'table/setTotal': assign((context, event) => {
        const total = event.data?.total ?? context.table?.total;
        assignObject(context.table, { total });
      }),

      'table/setTotalPages': assign((context, event) => {
        const totalPages =
          event.data?.totalPages ?? context.table?.totalPages;
        assignObject(context.table, { totalPages });
      }),

      'table/setHasNextPage': assign((context, event) => {
        const hasNextPage =
          event.data?.hasNextPage ?? context.table?.hasNextPage;
        assignObject(context.table, { hasNextPage });
      }),

      'table/setHasPreviousPage': assign((context, event) => {
        const hasPreviousPage =
          event.data?.hasPreviousPage ?? context.table?.hasPreviousPage;
        assignObject(context.table, { hasPreviousPage });
      }),

      'table/setCanFetchMore': assign((context, event) => {
        const canFetchMore =
          event.data?.canFetchMore ?? context.table?.canFetchMore;
        assignObject(context.table, { canFetchMore });
      }),

      'table/setCurrentPage': assign((context, event) => {
        const currentPage =
          event.data?.currentPage ?? context.table?.currentPage;
        assignObject(context.table, { currentPage });
      }),

      'table/setPageSize': assign((context, event) => {
        const pageSize = event.data?.pageSize ?? context.table?.pageSize;
        assignObject(context.table, { pageSize });
      }),
      // #endregion

      // #endregion
    },
  },
);

export type MainType = typeof MainMachine;
export type MainOptions = Required<MachineOptionsFrom<MainType>>;
export type MainState = StateFrom<MainType>;
export type MainStateValue = Extract<StateValueFrom<MainType>, string>;
