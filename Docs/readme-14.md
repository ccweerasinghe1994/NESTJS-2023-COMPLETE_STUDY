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
![alt text](./Assets/images/set-03/26.png)
![alt text](./Assets/images/set-03/27.png)
![alt text](./Assets/images/set-03/28.png)
## 144 - Assigning CurrentUser with a Middleware
![alt text](./Assets/images/set-03/29.png)

let's create a new middleware
```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users/users.service';
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      req.currentUser = await this.userService.findOne(userId);
    }
    next();
  }
}
```
let's add this module to the user module
```ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from '../middlewares/current-user.middleware';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
```
## 145 - Fixing a Type Definition Error
let's get rid of the error
```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      req.currentUser = await this.userService.findOne(userId);
    }
    next();
```
## 146 - Validating Query String Values
let's create a dto for getting estimation
```ts

import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
export class GetEstimateDto {
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
  mileage: number;
}
```

use it in the query
```ts
  reports.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';
@Controller('reports')
export class ReportsController {
  approveReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
    return this.reportService.changeApproval(id, body.approved);
  }
  @Get()
  getEstimate(@Query() query: GetEstimateDto) {}
}
```
when we test it we get an error

![alt text](./Assets/images/set-03/30.png)
## 147 - Transforming Query String Data
let's transform the query string data
```ts
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class GetEstimateDto {
  @IsString()
  @IsNumber()
  @Max(2050)
  @Min(1930)
  @Transform(({ value }) => parseInt(value))
  year: number;
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  longitude: number;
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  latitude: number;
  @IsNumber()
  @Max(1000000)
  @Min(0)
  @Transform(({ value }) => parseInt(value))
  mileage: number;
}
```

let's log the response

```ts
    }
  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    console.log(query);
  }
}
```
this is the transformed data

![alt text](./Assets/images/set-03/31.png)s
## 148 - How Will We Generate an Estimate

![alt text](./Assets/images/set-03/32.png)
![alt text](./Assets/images/set-03/33.png)

