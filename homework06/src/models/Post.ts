import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index, ManyToOne } from "typeorm"
import { User } from "./User"

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

  @Column("text", { nullable: true })
  status: string

  @ManyToOne(() => User, (user: User) => user.id)
  users: User[]
}
