import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { default: '' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ name: 'post_id' })
  postId: number;

  @ManyToOne(() => Post, (post) => post.comments, { eager: true })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
