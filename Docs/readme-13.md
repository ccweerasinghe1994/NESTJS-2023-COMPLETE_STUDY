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
## 127 - Saving a Report with the Reports Service
## 128 - Testing Report Creation
## 129 - Building Associations
## 130 - Types of Associations
## 131 - The ManyToOne and OneToMany Decorators
## 133 - More on Decorators
## 134 - Setting up the Association
## 135 - Formatting the Report Response
## 136 - Transforming Properties with a DTO

![alt text](./Assets/images/set-02/99.png)
![alt text](./Assets/images/set-02/100.png)