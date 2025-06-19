import type { ProcessType } from '../@types/env.types';
import { envSchema } from '../schema/env.schema';

const { error, warning, value } = envSchema.validate(process.env, {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
});

if (error?.details) {
  console.error(`ERROR:`);
  console.error(error);
  // eslint-disable-next-line no-magic-numbers
  process.exit(1);
}

if (warning) {
  console.warn(`WARN:`);
  console.warn(warning);
}

const { ENV, MONGOURI, PORT } = value as ProcessType;

const isProd = ENV === 'prod';

export { isProd, ENV, MONGOURI, PORT };
