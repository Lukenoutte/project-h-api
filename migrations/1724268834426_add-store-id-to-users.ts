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
    pgm.addColumn('users', {
        store_id: {
          type: 'integer',
          references: 'stores',
          notNull: false,
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
    pgm.dropColumn('users', 'store_id');
};
