const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.datasource, (table) => {
      table.uuid('datasourceid')
        .primary();

      table.string('name', 255)
        .notNullable();
    });
  },

  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.datasource);
  }
};

