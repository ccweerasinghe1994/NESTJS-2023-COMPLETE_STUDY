# Query Builders with TypeORM
## 149 - Creating a Query Builder 
![alt text](./Assets/images/set-03/34.png)

let's add the method to the controller
```ts
  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportService.createEstimate(query);
  }
}
```
let's create the method mention above
```ts
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
@Injectable()
export class ReportsService {
    report.approved = approved;
    return await this.reportsRepository.save(report);
  }
  async createEstimate(estimateDto: GetEstimateDto) {
    return this.reportsRepository
      .createQueryBuilder()
      .select('*')
      .where('make = :make', { make: estimateDto.make })
      .getRawMany();
  }
}
```

## 150 - Writing a Query to Produce the Estimate
![alt text](./Assets/images/set-03/35.png)
```ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
  ) {}

  async create(reportDto: CreateReportDto, user: User) {
    const report = this.reportsRepository.create(reportDto);
    report.user = user;
    return await this.reportsRepository.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportsRepository.findOne({
      where: { id },
    });
    if (!report) throw new NotFoundException('Report not found');
    report.approved = approved;
    return await this.reportsRepository.save(report);
  }

  async createEstimate({
    make,
    model,
    latitude,
    longitude,
    year,
    mileage,
  }: GetEstimateDto) {
    return this.reportsRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('latitude - :latitude BETWEEN -5 AND 5', { latitude })
      .andWhere('longitude - :longitude BETWEEN -5 AND 5', { longitude })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}

```

## 151 - Testing the Estimate Logic
![alt text](./Assets/images/set-03/36.png)
