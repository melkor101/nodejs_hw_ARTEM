import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { StatusEnum } from '../dto/enums';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  content: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.draft,
  })
  status: StatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ name: 'author_id' })
  authorId: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];
}
