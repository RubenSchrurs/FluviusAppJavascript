const { tables } = require('../../src/data');
const { withServer } = require('../supertest.setup');

const data = {
  categories: [
    { categorieid: 1, name: "Nutsvoorzieningen" },
    { categorieid: 2, name: "Omgeving" },
    { categorieid: 3, name: "Groene energie" },
    { categorieid: 4, name: "Financien" }
  ],
};

const dataToDelete = {
  categories: [1, 2, 3, 4]
};

describe('categories', () => {
  let knex;
  let request;
  
  withServer(({ knex: k, supertest: s}) => {
    knex = k;
    request = s;
  });

  const url = "/api/categories";

  //GET
  describe('GET /api/categories', () => {
    beforeAll(async () => {
      await knex(tables.categorie).insert(data.categories);
    });

    afterAll(async () => {
      await knex(tables.categorie)
        .whereIn("categorieid", dataToDelete.categories)
        .delete();
    });

    it("should 200 and return all categories", async () => {
      const response = await request.get(url);
      
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(4);
    });
  });
  
  //GET
  describe('GET /api/categories/:id', () => {
    beforeAll(async () => {
      await knex(tables.categorie).insert(data.categories[1]);
    });

    afterAll(async () => {
      await knex(tables.categorie)
        .where("categorieid", dataToDelete.categories[1])
        .delete();
    });
    
    it("should 200 and return the requested categorie", async () => {
      const categorieId = data.categories[1].categorieid;
      const response = await request.get(`${url}/${categorieId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        "categorie":  {
                "categorieid": "2",
                "name": "Omgeving",
              },
              "doelstellingen": [],
      });
    });
  });
});

