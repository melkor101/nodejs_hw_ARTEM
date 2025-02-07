import { IsNotEmpty } from 'class-validator';
import { StatusEnum } from './enums';
// import { ManyToOne, JoinColumn } from 'typeorm';
// import { User } from '../../users/entities/user.entity';

export class CreatePostDto {
  @IsNotEmpty()
  authorId: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  status: StatusEnum;
}
