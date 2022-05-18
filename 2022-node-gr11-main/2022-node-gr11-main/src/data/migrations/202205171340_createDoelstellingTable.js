const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.doelstelling, (table) => {
      table.uuid('doelstellingid')
        .primary();

      table.string('name', 255)
        .notNullable();
    });
  },

  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.doelstelling);
  }
};

