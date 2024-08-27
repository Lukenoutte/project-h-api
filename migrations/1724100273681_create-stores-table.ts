import { MigrationBuilder } from 'node-pg-migrate';
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm: MigrationBuilder) => {
    pgm.createTable('stores', {
        id: 'id',
        name: { type: 'varchar(100)', notNull: true },
        category: { type: 'varchar(50)' },
        subdomain: { type: 'varchar(100)', unique: true },
        master_id: {
            type: 'integer',
            notNull: true,
            references: 'users',
            onDelete: 'CASCADE'
        }
      });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm: MigrationBuilder) => {
    pgm.dropTable('stores');
};
