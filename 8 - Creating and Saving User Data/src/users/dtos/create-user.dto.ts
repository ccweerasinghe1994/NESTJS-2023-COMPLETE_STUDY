import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
