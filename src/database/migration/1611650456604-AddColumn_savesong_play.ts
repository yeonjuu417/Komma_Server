import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnSavesongPlay1611650456604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE savesong ADD play BOOLEAN DEFAULT false;`);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("savesong", "play");
      }

}
