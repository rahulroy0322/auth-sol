type EnvType = 'dev' | 'test' | 'prod';

type ProcessType = {
  ENV: EnvType;
  PORT: number;
  MONGOURI: string;
  JWT_SECRET: string;
};

export type { ProcessType };
