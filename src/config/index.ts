import { Environments } from './types';
export default () => ({
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || 'sparklife',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PWD || 'postgres',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false || true,
    logging: process.env.DB_ENABLE_LOGGING === 'true' ? true : false || false,
    entitiesPath: process.env.NODE_ENV === Environments.PROD ? './entities/*.js' : './entities/*.ts',
    migrationsPath: process.env.NODE_ENV === Environments.PROD ? './migrations/*.js' : './migrations/*.ts',
  }
});