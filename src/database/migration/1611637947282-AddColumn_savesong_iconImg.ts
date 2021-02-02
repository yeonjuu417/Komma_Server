import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnSavesongIconImg1611637947282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("savesong", new TableColumn({
            name: "icon",
            type: "varchar"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("savesong", "icon");
    }

}
