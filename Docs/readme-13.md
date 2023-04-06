# Relations with TypeORM

## 123 - Back to Reports 
![alt text](./Assets/images/set-02/95.png)
![alt text](./Assets/images/set-02/96.png)
## 124 - Adding Properties to Reports
updating the Report entity
```ts

  id: number;
  @Column()
  price: number;
  @Column()
  make: string;
  @Column()
  model: string;
  @Column()
  year: number;
  @Column()
  longitude: number;
  @Column()
  latitude: number;
  @Column()
  mileage: number;
```
## 125 - A DTO for Report Creation
![alt text](./Assets/images/set-02/97.png)
![alt text](./Assets/images/set-02/98.png)

creating the create-user.dto.ts
```ts
export class CreateReportDto {
  price: number;

  make: string;

  model: string;

  year: number;

  longitude: number;

  latitude: number;

  mileage: number;
}

```

adding the DTO to the controller
```ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';

@Controller('reports')
export class ReportsController {
  @Post()
  createReport(@Body() body: CreateReportDto) {
    return 'This action adds a new report';
  }
}

```
## 126 - Receiving Report Creation Requests
let's add validation to the DTO
```ts
13 - Relations with TypeORM\src\reports\dtos\create-report.dto.ts
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
export class CreateReportDto {
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Max(2050)
  @Min(1930)
  year: number;
  @IsLongitude()
  longitude: number;
  @IsLatitude()
  latitude: number;
  @IsNumber()
  @Max(1000000)
  @Min(0)
  price: number;
  @IsNumber()
  @Max(1000000)
  @Min(0)
  mileage: number;
}
```
let's add the guard to only allow authenticated users to create reports
```ts
13 - Relations with TypeORM\src\reports\reports.controller.ts
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    this.reportService.create(body);
  }
}
```

sample report 
```ts
13 - Relations with TypeORM\src\reports\reports.service.ts
import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
@Injectable()
export class ReportsService {
  create(body: CreateReportDto) {
    return 'This action adds a new report';
  }
}
```

## 127 - Saving a Report with the Reports Service
report service
```ts
import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
  ) {}
  async create(reportDto: CreateReportDto) {
    const report = this.reportsRepository.create(reportDto);
    return await this.reportsRepository.save(report);
  }
}
```
returning the report
```ts
@Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportService.create(body);
  }
}
```
## 128 - Testing Report Creation
we need to sign in to make the request
![alt text](./Assets/images/set-02/99.png)
if not
![alt text](./Assets/images/set-02/100.png)

## 129 - Building Associations
![alt text](./Assets/images/set-03/1.png)
![alt text](./Assets/images/set-03/2.png)
![alt text](./Assets/images/set-03/3.png)
![alt text](./Assets/images/set-03/4.png)
![alt text](./Assets/images/set-03/5.png)
![alt text](./Assets/images/set-03/6.png)
![alt text](./Assets/images/set-03/7.png)
![alt text](./Assets/images/set-03/8.png)
![alt text](./Assets/images/set-03/9.png)

## 130 - Types of Associations


![alt text](./Assets/images/set-03/10.png)
![alt text](./Assets/images/set-03/11.png)
## 131 - The ManyToOne and OneToMany Decorators
update the user entity
```ts
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from '../reports/report.entity';
@Entity()
export class User {
  @Column()
  password: string;
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id', this.id);
```

update report entity
```ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
@Entity()
export class Report {
  @Column()
  mileage: number;
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
```
## 133 - More on Decorators

![alt text](./Assets/images/set-03/12.png)
![alt text](./Assets/images/set-03/13.png)
## 134 - Setting up the Association

![alt text](./Assets/images/set-03/14.png)
![alt text](./Assets/images/set-03/15.png)
![alt text](./Assets/images/set-03/16.png)
![alt text](./Assets/images/set-03/17.png)

let's pass the user id to the report service
```ts
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
@Controller('reports')
export class ReportsController {
  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }
}
```

let's update the report service
```ts
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
@Injectable()
export class ReportsService {
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
  ) {}
  async create(reportDto: CreateReportDto, user: User) {
    const report = this.reportsRepository.create(reportDto);
    report.user = user;
    return await this.reportsRepository.save(report);
  }
```
## 135 - Formatting the Report Response
let's create a DTO
```ts

import { Expose, Transform } from 'class-transformer';
export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  longitude: number;
  @Expose()
  latitude: number;
  @Expose()
  mileage: number;

}
```
## 136 - Transforming Properties with a DTO

let's format the response
```ts

import { Expose, Transform } from 'class-transformer';
export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  longitude: number;
  @Expose()
  latitude: number;
  @Expose()
  mileage: number;
  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
}
```

let's use the DTO in the controller
```ts
reports.controller.ts
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptors';
import { ReportDto } from './dtos/report.dto';
@Controller('reports')
export class ReportsController {
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }
```
![alt text](./Assets/images/set-03/18.png)

