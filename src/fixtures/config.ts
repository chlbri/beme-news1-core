import { afterAll, beforeAll, vi } from 'vitest';

export function useFakeTimers() {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });
}
