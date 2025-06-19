type EnvType = 'dev' | 'test' | 'prod';

type ProcessType = {
  ENV: EnvType;
  PORT: number;
  MONGOURI: string;
};

export type { ProcessType };
