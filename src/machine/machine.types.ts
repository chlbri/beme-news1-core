import { Article, Category, WithoutID } from '~types';

export type Context = {
  navigation?: {
    history?: string[];
    current?: string;
  };
  defaultArticles?: Article[];
  allArticles?: Article[];
  articles?: Article[];
  search?: {
    input?: string;
  };
  table?: {
    allTotal?: number;
    total?: number;
    currentPage?: number;
    pageSize?: number;
    defaultPageSize?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    totalPages?: number;
    canFetchMore?: boolean;
  };
};

export type Sort = 'asc' | 'desc';

export type NavigateEvents =
  | { type: 'NAVIGATE/REPLACE'; page: string }
  | { type: 'NAVIGATE/PUSH'; page: string }
  | { type: 'NAVIGATE/BACK' };

export type SearchEvents =
  | ({ type: 'SEARCH/QUERY' } & Partial<Article>)
  | { type: 'SEARCH/INPUT'; input?: string };

export type UpdateArticle = Pick<Article, 'id'> &
  Partial<Omit<Article, 'id'>>;

export type TableSendEvents =
  | { type: 'TABLE/SEND/CREATE'; article: WithoutID<Article> }
  | { type: 'TABLE/SEND/DELETE'; id: string }
  | { type: 'TABLE/SEND/REMOVE'; id: string }
  | { type: 'TABLE/SEND/UPDATE'; article: UpdateArticle }
  | { type: 'TABLE/SEND/SORT'; sortBy: Partial<Record<Category, Sort>> }
  | { type: 'TABLE/SEND/GOTO'; page: number }
  | { type: 'TABLE/SEND/CHANGE_PAGE_SIZE'; size: number }
  | { type: 'TABLE/SEND/NEXT_PAGE' }
  | { type: 'TABLE/SEND/PREVIOUS_PAGE' }
  | { type: 'TABLE/SEND/FIRST_PAGE' }
  | { type: 'TABLE/SEND/LAST_PAGE' };

export type TableSetEVents =
  | {
      type: 'TABLE/SET/ARTICLES';
      data?: {
        articles?: Article[];
        allTotal?: number;
        total?: number;
        totalPages?: number;
        canFetchMore?: boolean;
        hasNextPage?: boolean;
        hasPreviousPage?: boolean;
      };
    }
  | {
      type: 'TABLE/SET/CURRENT_PAGE';
      data?: {
        currentPage?: number;
        hasNextPage?: boolean;
        hasPreviousPage?: boolean;
        canFetchMore?: boolean;
      };
    }
  | {
      type: 'TABLE/SET/PAGE_SIZE';
      data?: {
        pageSize?: number;
        totalPages?: number;
        hasNextPage?: boolean;
        hasPreviousPage?: boolean;
        canFetchMore?: boolean;
      };
    };

export type TableEvents = TableSendEvents | TableSetEVents;

export type Events = NavigateEvents | SearchEvents | TableEvents;

export type Services = {
  table: { data: unknown };
  fetchArticles: { data: { articles?: Article[] } };
  getArticles: { data: { articles?: Article[] } };
};
