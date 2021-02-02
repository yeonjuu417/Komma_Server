import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from "typeorm";
import User from "./User";
import Savesong from "./Savesong";

@Entity()
export default class Playlist extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  icon: string;

  @Column({ default: false })
  play: boolean;

  @ManyToOne(type => User, user => user.playlists, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  user: User;

  @OneToMany(type => Savesong, savesong => savesong.playlist, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  savesongs: Savesong[];

}
