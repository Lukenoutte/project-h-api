/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = function (pgm) {
  pgm.createTable('refresh_tokens', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users',
      onDelete: 'CASCADE'
    },
    token: {
      type: 'varchar(255)',
      notNull: true
    }
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = function (pgm) {
  pgm.dropTable('refresh_tokens');
};
