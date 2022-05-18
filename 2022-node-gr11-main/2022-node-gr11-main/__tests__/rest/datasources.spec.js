const { tables } = require('../../src/data');
const { withServer } = require('../supertest.setup');

const data = {
  datasources: [
    { datasourceid: 1, name: "Afval Reductie" },
    { datasourceid: 2, name: "Waterverbruik" },
    { datasourceid: 3, name: "Uitstoot" },
    { datasourceid: 4, name: "Houtafval" },
    { datasourceid: 5, name: "Energieverbruik" },
    { datasourceid: 6, name: "Gasverbruik" }
  ],
};

const dataToDelete = {
  datasources: [1, 2, 3, 4, 5, 6]
};

describe('datasources', () => {
  let knex;
  let request;
  
  withServer(({ knex: k, supertest: s}) => {
    knex = k;
    request = s;
  });

  const url = "/api/datasources";

  //GET
  describe('GET /api/datasources', () => {
    beforeAll(async () => {
      await knex(tables.datasource).insert(data.datasources);
    });

    afterAll(async () => {
      await knex(tables.datasource)
        .whereIn("datasourceid", dataToDelete.datasources)
        .delete();
    });

    it("should 200 and return all datasources", async () => {
      const response = await request.get(url);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(6);
    });
  });
  
  //GET
  describe('GET /api/datasources/:id', () => {
    beforeAll(async () => {
      await knex(tables.datasource).insert(data.datasources[3]);
    });

    afterAll(async () => {
      await knex(tables.datasource)
        .where("datasourceid", dataToDelete.datasources[3])
        .delete();
    });
    
    it("should 200 and return the requested datasource", async () => {
      const datasourceId = data.datasources[3].datasourceid;
      const response = await request.get(`${url}/${datasourceId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        datasourceid: "4",
        name: "Houtafval",
      });
    });
  });
});

