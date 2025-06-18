import debuger from 'debug';

import { PORT } from './config/app.config';

const debug = debuger(`APP:${PORT}`);

export { debug };
