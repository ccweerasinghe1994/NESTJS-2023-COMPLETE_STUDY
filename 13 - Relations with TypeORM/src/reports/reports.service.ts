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
