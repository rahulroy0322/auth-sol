import 'dotenv/config';
import mongoose from 'mongoose';

import app from './app';
import { DbUrl, PORT } from './config/app.config';
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
  .connect(DbUrl)
  .then(() => {
    debug('Database connected');
  })
  .catch((e) => {
    debug(`Database connection Error: ${e}`);
    close();
  });

process.on('SIGINT', close);
