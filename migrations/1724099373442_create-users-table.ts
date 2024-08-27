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
    pgm.createTable('users', {
        id: 'id',
        name: { type: 'varchar(100)', notNull: true },
        email: { type: 'varchar(100)', unique: true, notNull: true },
        password: { type: 'varchar(255)', notNull: true },
        // level: { type: integer, notNull: true }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm: MigrationBuilder) => {
    pgm.dropTable('users');
};
