import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import Playlist from "./Playlist";

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  darkMode: boolean;

  @Column()
  siteColor: string;

  @Column()
  salt: string;

  @OneToMany(type => Playlist, playlist => playlist.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  playlists: Playlist[];

}
