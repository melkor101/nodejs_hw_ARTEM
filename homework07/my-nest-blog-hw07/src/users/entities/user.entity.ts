import {
  Index,
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column('text')
  name: string;

  @Column('text')
  passwordHash: string;

  @Column('text')
  email: string;

  @Column('integer')
  age: number;

  @OneToMany(() => Post, (post: Post) => post.author)
  posts: Post[];
}
