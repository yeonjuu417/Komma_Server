import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnPlaylistPlay1611715096346 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE playlist ADD play BOOLEAN DEFAULT false;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("playlist", "play");
  }

}
