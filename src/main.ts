import mongoose from 'mongoose';

import app from './app';
import { PORT } from './config/app.config';
import { debug } from './debug';

const server = app.listen(PORT, () => {
  debug(`app listing on port ${PORT}`);
});

server.on('close', () => {
  debug(`app clossing of port ${PORT}`);
});

const close = async () => {
  server.closeAllConnections();
  server.close();
  await mongoose.connection.close();
  // eslint-disable-next-line no-magic-numbers
  process.exit(0);
};

mongoose
  .connect('mongodb://localhost:27017/auth-sol')
  .then(() => {
    debug('Database connected');
  })
  .catch((e) => {
    debug(`Database connection Error: ${e}`);
    close();
  });

process.on('SIGINT', close);
