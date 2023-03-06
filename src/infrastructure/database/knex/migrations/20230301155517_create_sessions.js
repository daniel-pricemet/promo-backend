/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('promo.sessions', (table) => {
    table.increments('id').primary();
    table.string('user_id');
    table.string('device_id');
    table.string('token');
    table.string('refresh_token');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('refreshed_at').defaultTo(knex.fn.now());
    table.timestamp('expires_at');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('promo.sessions');
};
