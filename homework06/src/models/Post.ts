import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index, ManyToOne } from "typeorm"
import { User } from "./User"
import { StatusEnum } from '../types/enums';

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Index()
  @Column("integer")
  authorId: number

  @Column('text')
  title: string

  @Column("text")
  content: string

  @Column({
    type: "enum",
    enum: StatusEnum,
    default: StatusEnum.draft,
  })
  status: StatusEnum

  @ManyToOne(() => User, (user: User) => user.id)
  users: User[]
}
