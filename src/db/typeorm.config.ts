import 'dotenv/config';
import { resolve } from 'node:path';
import { DataSource } from 'typeorm';
import { Env } from '../shared/env';

export default new DataSource({
  type: 'postgres',
  host: Env.DB_HOST,
  port: Env.DB_PORT,
  username: Env.DB_USERNAME,
  password: Env.DB_PASSWORD,
  database: Env.DB_NAME,
  entities: [resolve(__dirname, '../app/**/*.entity.{ts,js}')],
  migrations: [resolve(__dirname, 'migrations/*.{ts,js}')],
  migrationsRun: true,
});
