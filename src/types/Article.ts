import { nanoid } from 'nanoid';
import { z } from 'zod';
import { categorySchema } from './Category';
import { languageSchema } from './Language';

export const articleSchema = z
  .object({
    author: z.string().nullish().default('Unknown'),
    URL: z.string().url(),
    imageURL: z.string().url().nullish(),
    publishedAt: z.string().datetime(),
    description: z.string().nullish(),
    source: z.string(),
    language: languageSchema,
    title: z.string(),
    category: categorySchema,
  })
  .transform(article => ({
    ...article,
    publishedAt: new Date(article.publishedAt),
    id: nanoid(13),
  }));

export type ArticleJSON = z.input<typeof articleSchema>;
export type Article = z.output<typeof articleSchema>;
