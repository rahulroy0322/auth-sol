import Joi from 'joi';

import type { ProcessType } from '../@types/env.types';

const ENVS = ['dev', 'test', 'prod'] satisfies ProcessType['ENV'][];

const envSchema = Joi.object<ProcessType>({
  ENV: Joi.string()
    .valid(...ENVS)
    .default('dev'),
  // eslint-disable-next-line no-magic-numbers
  PORT: Joi.number().default(8000),
  MONGOURI: Joi.string().required(),
});

export { envSchema };
