import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index } from "typeorm"
import { Post } from "./Post"



@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Index()
  @Column("text")
  name: string

  @Column("text")
  email: string

  @Column("integer")
  age: number

  @OneToMany(() => Post, (post: Post) => post.authorId)
  posts: Post[]

}
