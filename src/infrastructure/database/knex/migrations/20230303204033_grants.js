exports.up = function (knex) {
  return knex.schema
    .createTable('promo.grants', function (table) {
      table.increments('id').primary();
      table.string('name', 25);
      table.string('description', 255);
    })
    .createTable('promo.user_grants', function (table) {
      table.integer('grant_id').unsigned();
      table.string('user_id');
      table.string('granted_by');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.primary(['grant_id', 'user_id']);
      table.foreign('grant_id').references('id').inTable('grants');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('promo.user_grants').dropTable('promo.grants');
};
