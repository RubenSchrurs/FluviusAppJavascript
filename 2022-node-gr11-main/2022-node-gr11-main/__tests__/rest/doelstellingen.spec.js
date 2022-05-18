const { tables } = require('../../src/data');
const { withServer } = require('../supertest.setup');

const data = {
  doelstellingen: [
    { doelstellingid: 1, name: "Afval" },
    { doelstellingid: 2, name: "Houtafval" },
    { doelstellingid: 3, name: "Gasverbruik" },
    { doelstellingid: 4, name: "Energieverbruik" },
    { doelstellingid: 5, name: "Uitstoot" }
  ],
};

const dataToDelete = {
  doelstellingen: [1, 2, 3, 4, 5]
};

describe('doelstellingen', () => {
  let knex;
  let request;
  
  withServer(({ knex: k, supertest: s}) => {
    knex = k;
    request = s;
  });

  const url = "/api/doelstellingen";

  //GET
  describe('GET /api/doelstellingen', () => {
    beforeAll(async () => {
      await knex(tables.doelstelling).insert(data.doelstellingen);
    });

    afterAll(async () => {
      await knex(tables.doelstelling)
        .whereIn("doelstellingid", dataToDelete.doelstellingen)
        .delete();
    });

    it("should 200 and return all doelstellingen", async () => {
      const response = await request.get(url);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(5);
    });
  });
  
  
  //GET
  describe('GET /api/doelstellingen/:id', () => {
    beforeAll(async () => {
      await knex(tables.doelstelling).insert(data.doelstellingen[2]);
    });

    afterAll(async () => {
      await knex(tables.doelstelling)
        .where("doelstellingid", dataToDelete.doelstellingen[2])
        .delete();
    });
    
    it("should 200 and return the requested doelstelling", async () => {
      const doelstellingId = data.doelstellingen[2].doelstellingid;
      const response = await request.get(`${url}/${doelstellingId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        "datasources": {
               "Doelstellingleaf_DOELSTELLINGID": null,
               "datasourceid": null,
               "datasources_DATASOURCEID": null,
               "doelstellingid": "3",
               "name": null,
              },
              "doelstelling": {
                "doelstellingid": "3",
                "name": "Gasverbruik",
              },
      });
    });
  });
});

