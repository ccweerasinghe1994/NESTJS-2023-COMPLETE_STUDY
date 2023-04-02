import { Module } from '@nestjs/common';
import { DiskService } from './disk.service';
import {PowerModule} from "../power/power.module";

@Module({
  providers: [DiskService],
  imports:[PowerModule]
})
export class DiskModule {
}
