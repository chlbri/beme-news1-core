import { z } from 'zod';

export const languageSchema = z.enum(['en', 'fr', 'es']);
export type Language = z.infer<typeof languageSchema>;
