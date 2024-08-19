/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('stores', {
        id: 'id',
        name: { type: 'varchar(100)', notNull: true },
        address: { type: 'text' },
        city: { type: 'varchar(100)' },
        country: { type: 'varchar(100)' },
        phone: { type: 'varchar(15)' },
        category: { type: 'varchar(50)' },
        subdomain: { type: 'varchar(100)', unique: true }
      });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('stores');
};
