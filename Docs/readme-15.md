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
## 151 - Testing the Estimate Logic
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