import { createMachine, sendParent } from 'xstate';

export const table = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    initial: 'all',
    context: {},
    states: {
      all: {
        on: {
          DELETE: {
            actions: 'setArticles',
          },
          UPDATE: {
            actions: 'setArticles',
          },
          CREATE: {
            actions: 'setArticles',
          },
          REMOVE: {
            actions: 'setArticles',
          },
          SORT: {
            actions: 'setArticles',
          },
          GOTO: {
            actions: 'setCurrentPage',
          },
          CHANGE_PAGE_SIZE: {
            actions: 'changePageSize',
          },
          NEXT: {
            actions: 'gotoNextPage',
          },
          PREVIOUS: {
            actions: 'gotoPreviousPage',
          },
          FIRST_PAGE: {
            actions: 'gotoFistPage',
          },
          LAST_PAGE: {
            actions: 'gotoLastPage',
          },
        },
      },
    },
  },
  {
    actions: {
      setArticles: sendParent('TABLE/SET/ARTICLES'),
      setCurrentPage: sendParent('TABLE/SET/CURRENT_PAGE'),
      changePageSize: sendParent('TABLE/SET/PAGE_SIZE'),
      gotoNextPage: sendParent('TABLE/SET/CURRENT_PAGE'),
      gotoPreviousPage: sendParent('TABLE/SET/CURRENT_PAGE'),
      gotoFistPage: sendParent('TABLE/SET/CURRENT_PAGE'),
      gotoLastPage: sendParent('TABLE/SET/CURRENT_PAGE'),
    },
  },
);
