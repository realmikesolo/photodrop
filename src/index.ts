import 'dotenv/config';
import { connectDB } from './db';
import { Env } from './env';
import { startServer } from './server';

(async () => {
  try {
    await connectDB();
    await startServer(Env.SERVER_PORT);
  } catch (e) {
    console.error(e);
  }
})();
