# A Basic Permissions System
## 137 - Adding in Report Approval 
![alt text](./Assets/images/set-03/19.png)

let's add the approved column
```ts
  @Column()
  year: number;
  @Column({ default: false })
  approved: boolean;
  @Column()
  longitude: number;

```

let's create the new dto for the approved report
```ts
import { IsBoolean } from 'class-validator';
export class ApproveReportDto {
  @IsBoolean()
  approved: boolean;
}
```

let's create the new path endpoint
```ts 
import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptors';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
@Controller('reports')
export class ReportsController {
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }
  @Patch('/:id')
  approveReport(@Param('id') id: number, @Body() body: ApproveReportDto) {}
}
```
## 139 - Testing Report Approval
let's change the report dto to include the approved column
```ts
  latitude: number;
  @Expose()
  mileage: number;
  @Expose()
  approved: boolean;
  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
```

let's create the method for the approve report
```ts
13 - Relations with TypeORM\src\reports\reports.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
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
}
```

let's use the newly created method inside the controller
```ts
13 - Relations with TypeORM\src\reports\reports.controller.ts
  }
  @Patch('/:id')
  approveReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
    return this.reportService.changeApproval(id, body.approved);
  }
}
```
let's test the result in postman

![alt text](./Assets/images/set-03/20.png)
## 140 - Authorization vs Authentication
![alt text](./Assets/images/set-03/21.png)
![alt text](./Assets/images/set-03/22.png)



## 141 - Adding an Authorization Guard
let's add a new column to the user entity
```ts
  @Column({ default: false })
  isAdmin: boolean;
```

let's create a new guard
```ts
import { CanActivate, ExecutionContext } from '@nestjs/common';
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      return false;
    }
    return request.currentUser.isAdmin;
  }
}
```
## 142 - The Guard doesn't Work
let's add the guard to the controller
```ts
import { Serialize } from '../interceptors/serialize.interceptors';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
@Controller('reports')
export class ReportsController {
  }
  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
    return this.reportService.changeApproval(id, body.approved);
  }
```
![alt text](./Assets/images/set-03/23.png)
![alt text](./Assets/images/set-03/24.png)
![alt text](./Assets/images/set-03/25.png)
## 143 - Middlewares Guards and Interceptors
## 144 - Assigning CurrentUser with a Middleware
## 145 - Fixing a Type Definition Error
## 146 - Validating Query String Values
## 147 - Transforming Query String Data
## 148 - How Will We Generate an Estimate



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