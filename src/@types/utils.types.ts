type Pritify<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K];
} & {};

export type { Pritify };
