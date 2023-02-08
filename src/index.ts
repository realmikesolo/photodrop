import 'dotenv/config';
import { connectDB } from './db/db';
import { Env } from './shared/env';
import { startServer } from './server';

(async () => {
  try {
    await connectDB();
    await startServer(Env.SERVER_PORT);
  } catch (e) {
    console.error(e);
  }
})();
