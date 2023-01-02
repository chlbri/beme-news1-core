export type Context = {
  navigation?: {
    history: string[];
    current: string;
  };
};

export type Events =
  | { type: 'NAVIGATE.POP' }
  | { type: 'NAVIGATE.PUSH' }
  | { type: 'NAVIGATE.POP' };
