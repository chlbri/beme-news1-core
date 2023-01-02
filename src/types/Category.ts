import { z } from 'zod';

export const categorySchema = z.enum([
  'bitcoin',
  'football',
  'politics',
  'stocks',
  'cinema',
  'nba',
  'video games',
  'music',
  'tech',
]);

export type Category = z.infer<typeof categorySchema>;
