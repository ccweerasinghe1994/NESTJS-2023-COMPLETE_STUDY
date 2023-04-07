# Production Deployment
## 152 - The Path to Production 
![alt text](./Assets/images/set-03/37.png)

## 153 - Providing the Cookie Key
let's add a cookie key to the env file
```ts
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get<string>('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
```
## 154 - Understanding the Synchronize Flag

![alt text](./Assets/images/set-03/38.png)
![alt text](./Assets/images/set-03/39.png)
## 155 - The Dangers of Synchronize
![alt text](./Assets/images/set-03/40.png)
## 156 - The Theory Behind Migrations
![alt text](./Assets/images/set-03/41.png)
![alt text](./Assets/images/set-03/42.png)
## 157 - Headaches with Config Management
![alt text](./Assets/images/set-03/43.png)
![alt text](./Assets/images/set-03/44.png)
![alt text](./Assets/images/set-03/45.png)
## 158 - TypeORM and Nest Config is Great

![alt text](./Assets/images/set-03/46.png)
![alt text](./Assets/images/set-03/47.png)
![alt text](./Assets/images/set-03/48.png)
![alt text](./Assets/images/set-03/49.png)
![alt text](./Assets/images/set-03/50.png)
![alt text](./Assets/images/set-03/51.png)
![alt text](./Assets/images/set-03/52.png)
## 159 - EnvSpecific Database Config

![alt text](./Assets/images/set-03/53.png)
![alt text](./Assets/images/set-03/54.png)
## 160 - Installing the TypeORM CLI
let's create a data source file 
```ts
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
```

let's add a new script to the package.json
```json
    "test:watch": "cross-env NODE_ENV=test jest --watch",
    "test:cov": "cross-env NODE_ENV=test jest --coverage",
    "test:debug": "cross-env NODE_ENV=test node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "cross-env NODE_ENV=test jest --config ./test/jest-e2e.json --maxWorkers=1",
    "typeorm": "typeorm-ts-node-esm"
  },
  "dependencies": {
    "@nestjs/common": "^9.0.0",
    "supertest": "^6.1.3",
    "ts-jest": "^29",
    "ts-loader": "^9.2.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "4.2.0",
    "typescript": "^4"
  },
```

let's generate a empty migration file
```bash
typeorm migration:create ./db/migrations/InitialSchema 
```
generated migration
```ts
import { MigrationInterface, QueryRunner } from "typeorm"

export class InitialSchema1680856502015 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
```

## 161 - Generating and Running Migrations
## 163 - Running Migrations During E2E Tests
## 164 - Production DB Config
## 166 - Heroku Specific Project Config
## 166 - Heroku Specific Project Config_DV
## 167 - Deploying the App Final Lecture





![alt text](./Assets/images/set-03/55.png)
![alt text](./Assets/images/set-03/56.png)
![alt text](./Assets/images/set-03/57.png)
![alt text](./Assets/images/set-03/58.png)
![alt text](./Assets/images/set-03/59.png)
![alt text](./Assets/images/set-03/60.png)
![alt text](./Assets/images/set-03/61.png)
![alt text](./Assets/images/set-03/62.png)
![alt text](./Assets/images/set-03/63.png)
![alt text](./Assets/images/set-03/64.png)
![alt text](./Assets/images/set-03/65.png)
![alt text](./Assets/images/set-03/66.png)
![alt text](./Assets/images/set-03/67.png)
![alt text](./Assets/images/set-03/68.png)
![alt text](./Assets/images/set-03/69.png)
![alt text](./Assets/images/set-03/70.png)
![alt text](./Assets/images/set-03/71.png)
![alt text](./Assets/images/set-03/72.png)
![alt text](./Assets/images/set-03/73.png)
![alt text](./Assets/images/set-03/74.png)
![alt text](./Assets/images/set-03/75.png)
![alt text](./Assets/images/set-03/76.png)
![alt text](./Assets/images/set-03/77.png)
![alt text](./Assets/images/set-03/78.png)
![alt text](./Assets/images/set-03/79.png)
![alt text](./Assets/images/set-03/80.png)
![alt text](./Assets/images/set-03/81.png)
![alt text](./Assets/images/set-03/82.png)
![alt text](./Assets/images/set-03/83.png)
![alt text](./Assets/images/set-03/84.png)
![alt text](./Assets/images/set-03/85.png)
![alt text](./Assets/images/set-03/86.png)
![alt text](./Assets/images/set-03/87.png)
![alt text](./Assets/images/set-03/88.png)
![alt text](./Assets/images/set-03/89.png)
![alt text](./Assets/images/set-03/90.png)
![alt text](./Assets/images/set-03/91.png)
![alt text](./Assets/images/set-03/92.png)
![alt text](./Assets/images/set-03/93.png)
![alt text](./Assets/images/set-03/94.png)
![alt text](./Assets/images/set-03/95.png)
![alt text](./Assets/images/set-03/96.png)
![alt text](./Assets/images/set-03/97.png)
![alt text](./Assets/images/set-03/98.png)
![alt text](./Assets/images/set-03/99.png)
![alt text](./Assets/images/set-03/100.png)