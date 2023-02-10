export const Env = {
  SERVER_PORT: Number(process.env.SERVER_PORT!),
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: Number(process.env.DB_PORT!),
  DB_USERNAME: process.env.DB_USERNAME!,
  DB_PASSWORD: process.env.DB_PASSWORD!,
  DB_NAME: process.env.DB_NAME!,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!,
};
