import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'process';

export const myDataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.DB_NAME || 'test.sqlite',
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  synchronize: false,
};

const myDataSource = new DataSource(myDataSourceOptions);
export default myDataSource;
