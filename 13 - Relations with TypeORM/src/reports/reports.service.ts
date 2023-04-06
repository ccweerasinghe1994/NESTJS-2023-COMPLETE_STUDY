import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportsService {
  create(body: CreateReportDto) {
    return 'This action adds a new report';
  }
}
