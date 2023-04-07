import { DataSource, DataSourceOptions } from 'typeorm';
import * as process from 'process';
import { User } from '../src/users/user.entity';
import { Report } from '../src/reports/report.entity';
import { Initial1680860477262 } from './migrations/1680860477262-Initial';

export const myDataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.DB_NAME || 'db.sqlite',
  entities: [User, Report],
  migrations: [Initial1680860477262],
  synchronize: false,
};

const myDataSource = new DataSource(myDataSourceOptions);
export default myDataSource;
