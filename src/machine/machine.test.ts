import { ALWAYS_TIME, interpret } from '@bemedev/x-test';
import { describe, test } from 'vitest';
import { NUMBERS } from '~constants';
import {
  advanceByTime,
  fetchArticles,
  table,
  useFakeTimers,
} from '~fixtures';
import { emptyVoid } from '~helpers';
import { MainMachine } from '~machine';

useFakeTimers();

const machine = MainMachine.withConfig({
  actions: {
    'navigation/back': emptyVoid,
    'navigation/push': emptyVoid,
    'navigation/replace': emptyVoid,
    buildHistory: emptyVoid,
    logFetchError: emptyVoid,
    logLocalFetchError: emptyVoid,
  },
  services: {
    getArticles: async () => ({ articles: [] }),
    fetchArticles,
    table,
  },
});

const { start, matches, context, send, stop } = interpret(machine);

describe('Workflow #1', () => {
  test('#00: Start the machine', () => {
    start();
  });

  test('#01: The current state is "cache.fetch"', () => {
    matches('work', 'work.search.inactive');
  });

  test('#02: Default Articles are defined', () => {
    context([], context => context.defaultArticles);
  });

  test('#03: Articles are defined', () => {
    context([], context => context.articles);
  });

  test('#04: Page sizes are set to default', () => {
    context(NUMBERS.DEFAULT_PAGE_SIZE, context => context.table?.pageSize);
    context(
      NUMBERS.DEFAULT_PAGE_SIZE,
      context => context.table?.defaultPageSize,
    );
  });

  test('#05: Input "bitcoin"', () => {
    send('SEARCH/INPUT', { input: 'bitcoin' });
  });

  test('#06: The current state is "work.search.active"', () => {
    matches('work.search.checking');
  });

  test('#07: Advance in Time', () => advanceByTime(ALWAYS_TIME));

  test('#08: The current state is "work.search.active"', () => {
    matches('work.search.active', 'work.search.active.idle');
  });

  test('#09: Advance in Time', () => advanceByTime(ALWAYS_TIME));

  test('#10: The current state is "work.search.active.loading"', () => {
    matches('work.search.active.loading');
  });

  test('#11: send QUERY', () => {
    send('SEARCH/QUERY');
  });

  test('#13: The current state is "work.search.active.busy"', () => {
    matches('work.search.active.busy');
  });

  test('#14: Advance in Time', () =>
    advanceByTime(NUMBERS.DEFAULT_THROTTLE_TIME));

  test('#15: The current state is "work.search.active.idle"', () => {
    matches('work.search.active.idle');
  });

  test('#16: Advance in Time', () => advanceByTime(ALWAYS_TIME));

  test('#17: The current state is "work.search.active.loading"', () => {
    matches('work.search.active.loading');
  });

  test('#18: Stop the machine', () => {
    stop();
  });
});

describe('Workflow #2', () => {
  test('#00: Start the machine', () => {
    start();
  });

  test('#01: The current state is "cache.fetch"', () => {
    matches('work', 'work.table');
  });

  test('#02: Advance in Time', () =>
    advanceByTime(NUMBERS.DEFAULT_THROTTLE_TIME));

  test('#03: DELETE', () => {
    send('TABLE/SEND/DELETE');
  });

  test('#04: Advance in Time', () =>
    advanceByTime(NUMBERS.DEFAULT_THROTTLE_TIME));

  test('#05: CREATE', () => {
    send('TABLE/SEND/CREATE');
  });

  test('#06: Advance in Time', () =>
    advanceByTime(NUMBERS.DEFAULT_THROTTLE_TIME));

  test('#07: REMOVE', () => {
    send('TABLE/SEND/REMOVE');
  });

  test('#08: Advance in Time', () =>
    advanceByTime(NUMBERS.DEFAULT_THROTTLE_TIME));

  test('#09: UPDATE', () => {
    send('TABLE/SEND/UPDATE');
  });

  test('#10: Advance in Time', () =>
    advanceByTime(NUMBERS.DEFAULT_THROTTLE_TIME));

  test('#11: SORT', () => {
    send('TABLE/SEND/SORT');
  });

  test('#12: Advance in Time', () =>
    advanceByTime(NUMBERS.DEFAULT_THROTTLE_TIME));

  test('#13: CHANGE_PAGE_SIZE', () => {
    send('TABLE/SEND/CHANGE_PAGE_SIZE');
  });

  test('#14: Advance in Time', () =>
    advanceByTime(NUMBERS.DEFAULT_THROTTLE_TIME));

  test('#15: GOTO', () => {
    send('TABLE/SEND/GOTO');
  });

  test('#16: Advance in Time', () =>
    advanceByTime(NUMBERS.DEFAULT_THROTTLE_TIME));

  test('#17: Go to nextPage', () => {
    send('TABLE/SEND/NEXT_PAGE');
  });

  test('#18: Advance in Time', () =>
    advanceByTime(NUMBERS.DEFAULT_THROTTLE_TIME));

  test('#19: Advance in Time', () =>
    advanceByTime(NUMBERS.DEFAULT_THROTTLE_TIME));

  test('#20: Go to prevPage', () => {
    send('TABLE/SEND/PREVIOUS_PAGE');
  });

  test('#21: Stop the machine', () => {
    stop();
  });
});
