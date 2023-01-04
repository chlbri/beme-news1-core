import { assign } from '@xstate/immer';
import {
  createMachine,
  MachineOptionsFrom,
  send,
  StateFrom,
  StateValueFrom,
} from 'xstate';
import { NUMBERS } from '~constants';
import { assignObject } from '~helpers';
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
    context: {},

    id: 'main',
    initial: 'cache',
    states: {
      cache: {
        description: '',
        initial: 'local',
        states: {
          local: {
            invoke: {
              src: 'getArticles',
              id: 'getArticles',
              onDone: [
                {
                  cond: 'hasArticles',
                  target: '#work',
                  actions: ['setDefaultArticles', 'setArticles'],
                },
                { target: 'fetch' },
              ],
              onError: {
                target: 'fetch',
                actions: 'logLocalFetchError',
              },
            },
          },
          fetch: {
            entry: 'defaultQuery',
            invoke: {
              src: 'fetchArticles',
              id: 'fetchArticles',
              onDone: [
                {
                  target: '#work',
                  actions: ['setDefaultArticles', 'setArticles'],
                },
              ],
              onError: [
                {
                  target: '#work',
                  actions: ['logFetchError'],
                },
              ],
            },
          },
        },
      },
      work: {
        id: 'work',
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
                          target: 'busy',
                          actions: 'setArticles',
                        },
                      ],
                      onError: [
                        {
                          target: 'busy',
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
                  busy: {
                    after: {
                      THROTTLE_TIME: 'idle',
                    },
                  },
                  idle: {
                    always: 'loading',
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
            initial: 'busy',
            on: {
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

            states: {
              busy: {
                after: {
                  THROTTLE_TIME: 'ready',
                },
              },
              ready: {
                on: {
                  // #region Senders
                  'TABLE/SEND/CREATE': {
                    actions: ['table/create'],
                    target: 'busy',
                  },

                  'TABLE/SEND/DELETE': {
                    actions: ['table/delete'],
                    target: 'busy',
                  },

                  'TABLE/SEND/REMOVE': {
                    actions: ['table/remove'],
                    target: 'busy',
                  },

                  'TABLE/SEND/UPDATE': {
                    actions: ['table/update'],
                    target: 'busy',
                  },

                  'TABLE/SEND/SORT': {
                    actions: ['table/sort'],
                    target: 'busy',
                  },

                  'TABLE/SEND/GOTO': {
                    actions: ['table/goto'],
                    target: 'busy',
                  },

                  'TABLE/SEND/CHANGE_PAGE_SIZE': {
                    actions: ['table/changePageSize'],
                    target: 'busy',
                  },

                  'TABLE/SEND/NEXT_PAGE': {
                    actions: ['table/next'],
                    target: 'busy',
                  },

                  'TABLE/SEND/PREVIOUS_PAGE': {
                    actions: ['table/previous'],
                    target: 'busy',
                  },

                  'TABLE/SEND/FIRST_PAGE': {
                    actions: ['table/gotoFirst'],
                    target: 'busy',
                  },

                  'TABLE/SEND/LAST_PAGE': {
                    actions: ['table/gotoLast'],
                    target: 'busy',
                  },

                  // #endregion
                },
              },
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
        const input = context.search?.input; //?
        return !!input && input.trim().length > 0;
      },

      hasArticles: (_, event) => {
        const articles = event.data.articles;
        return !!articles && articles.length > 0;
      },
    },
    actions: {
      defaultQuery: send('QUERY', { to: 'fetchArticles' }),

      setDefaultArticles: assign((context, event) => {
        context.defaultArticles = event.data.articles;
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

      'table/changePageSize': send('CHANGE_PAGE_SIZE', { to: 'table' }),

      'table/next': send('NEXT_PAGE', { to: 'table' }),
      'table/previous': send('PREVIOUS_PAGE', { to: 'table' }),
      'table/gotoFirst': send('FIRST_PAGE', { to: 'table' }),
      'table/gotoLast': send('LAST_PAGE', { to: 'table' }),
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
    delays: {
      THROTTLE_TIME: NUMBERS.DEFAULT_THROTTLE_TIME,
    },
  },
);

export type MainType = typeof MainMachine;
export type MainOptions = Required<MachineOptionsFrom<MainType>>;
export type MainState = StateFrom<MainType>;
export type MainStateValue = Extract<StateValueFrom<MainType>, string>;
