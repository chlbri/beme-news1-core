import { createMachine } from 'xstate';

export const fetchArticles = createMachine({
  predictableActionArguments: true,
  preserveActionOrder: true,
  initial: 'idle',
  context: {},
  states: {
    idle: {
      on: {
        QUERY: 'final',
      },
    },
    final: {
      type: 'final',

      data: {
        articles: [],
      },
    },
  },
});
