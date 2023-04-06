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

## 135 - Formatting the Report Response
## 136 - Transforming Properties with a DTO

![alt text](./Assets/images/set-03/14.png)
![alt text](./Assets/images/set-03/15.png)
![alt text](./Assets/images/set-03/16.png)
![alt text](./Assets/images/set-03/17.png)
![alt text](./Assets/images/set-03/18.png)
![alt text](./Assets/images/set-03/19.png)
![alt text](./Assets/images/set-03/20.png)
![alt text](./Assets/images/set-03/21.png)
![alt text](./Assets/images/set-03/22.png)
![alt text](./Assets/images/set-03/23.png)
![alt text](./Assets/images/set-03/24.png)
![alt text](./Assets/images/set-03/25.png)
![alt text](./Assets/images/set-03/26.png)
![alt text](./Assets/images/set-03/27.png)
![alt text](./Assets/images/set-03/28.png)
![alt text](./Assets/images/set-03/29.png)
![alt text](./Assets/images/set-03/30.png)
![alt text](./Assets/images/set-03/31.png)
![alt text](./Assets/images/set-03/32.png)
![alt text](./Assets/images/set-03/33.png)
![alt text](./Assets/images/set-03/34.png)
![alt text](./Assets/images/set-03/35.png)
![alt text](./Assets/images/set-03/36.png)
![alt text](./Assets/images/set-03/37.png)
![alt text](./Assets/images/set-03/38.png)
![alt text](./Assets/images/set-03/39.png)
![alt text](./Assets/images/set-03/40.png)
![alt text](./Assets/images/set-03/41.png)
![alt text](./Assets/images/set-03/42.png)
![alt text](./Assets/images/set-03/43.png)
![alt text](./Assets/images/set-03/44.png)
![alt text](./Assets/images/set-03/45.png)
![alt text](./Assets/images/set-03/46.png)
![alt text](./Assets/images/set-03/47.png)
![alt text](./Assets/images/set-03/48.png)
![alt text](./Assets/images/set-03/49.png)
![alt text](./Assets/images/set-03/50.png)
![alt text](./Assets/images/set-03/51.png)
![alt text](./Assets/images/set-03/52.png)
![alt text](./Assets/images/set-03/53.png)
![alt text](./Assets/images/set-03/54.png)
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