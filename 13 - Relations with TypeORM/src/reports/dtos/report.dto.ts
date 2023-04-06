import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  longitude: number;
  @Expose()
  latitude: number;
  @Expose()
  mileage: number;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
}
