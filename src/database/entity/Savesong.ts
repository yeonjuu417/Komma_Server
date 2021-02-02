import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import Playlist from "./Playlist";

@Entity()
export default class Savesong extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  iconImg: string;

  @Column()
  title: string;

  @Column()
  soundFile: string;

  @Column({ type: "float" })
  defaultVolume: number;

  @Column({ default: false })
  play: boolean;

  @ManyToOne(type => Playlist, playlist => playlist.savesongs, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  playlist: Playlist;

}
