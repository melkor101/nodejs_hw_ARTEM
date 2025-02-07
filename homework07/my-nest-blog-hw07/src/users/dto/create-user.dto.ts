import { IsEmail, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNumber()
  @Min(16)
  @Max(99)
  age: number;
}
