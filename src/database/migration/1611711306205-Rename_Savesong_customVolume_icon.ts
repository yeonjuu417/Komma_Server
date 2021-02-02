import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameSavesongCustomVolumeIcon1611711306205 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE savesong CHANGE customVolume defaultVolume float;`);
    await queryRunner.query(`ALTER TABLE savesong CHANGE icon iconImg varchar(255);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE savesong CHANGE defaultVolume customVolume float;`);
    await queryRunner.query(`ALTER TABLE savesong CHANGE iconImg icon varchar(255);`);
  }

}
