import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

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
