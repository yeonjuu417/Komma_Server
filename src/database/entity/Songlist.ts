import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export default class Songlist extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  iconImg: string;

  @Column()
  soundFile: string;

  @Column({ default: 0.4 })
  defaultVolume: number;

  @Column({ default: false })
  play: boolean;

}
