const { shutdownData, getKnex, tables } = require('../src/data');

module.exports = async () => {
  const knex = getKnex();

  await knex(tables.categorie).delete();
  await knex(tables.doelstelling).delete();
  await knex(tables.datasource).delete();

  await shutdownData();
};

