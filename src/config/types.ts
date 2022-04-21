export enum Environments {
  DEV = 'DEV',
  QA = 'QA',
  PROD = 'PROD',
}

export interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
  synchronize: boolean;
  logging: boolean;
  entitiesPath: string;
  migrationsPath: string;
}
