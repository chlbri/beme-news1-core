import { createMachine } from 'xstate';
import { Context, Events } from './machine.types';

export const MainMachine = createMachine({
  predictableActionArguments: true,
  preserveActionOrder: true,
  schema: {
    context: {} as Context,
    events: {} as Events,
  },
  tsTypes: {} as import('./machine.typegen').Typegen0,

  id: 'main',
  initial: 'cache',
  states: {
    cache: {
      description: '',
      entry: 'forwardDefaultQuery',
      invoke: {
        src: 'fetchNews',
        id: 'fetchNews',
        onDone: [
          {
            target: 'work',
            actions: 'setNews',
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
                    src: 'fetchNews',
                    id: 'fetchNews',
                    onDone: [
                      {
                        target: 'idle',
                        actions: 'setNews',
                      },
                    ],
                    onError: [
                      {
                        target: 'idle',
                      },
                    ],
                  },
                  on: {
                    QUERY: {
                      actions: 'forwardQuery',
                      description: 'Forward with parameters',
                    },
                  },
                },
                idle: {
                  always: {
                    target: 'loading',
                  },
                },
              },
            },
            checking: {
              always: [
                {
                  target: 'active',
                  cond: 'hasInput',
                },
                {
                  target: 'inactive',
                },
              ],
            },
          },
          on: {
            INPUT: {
              target: '.checking',
              actions: 'setInput',
            },
          },
        },
      },
      type: 'parallel',
    },
  },
});
