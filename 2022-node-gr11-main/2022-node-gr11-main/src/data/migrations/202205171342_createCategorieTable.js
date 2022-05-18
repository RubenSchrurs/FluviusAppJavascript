const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.categorie, (table) => {
      table.uuid('categorieid')
        .primary();

      table.string('name', 255)
        .notNullable();
    });
  },

  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.categorie);
  }
};

