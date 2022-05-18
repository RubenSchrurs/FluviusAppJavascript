const uuid = require("uuid");
const { tables, getKnex } = require("../data/index");
const { getChildLogger } = require("../core/logging");

const findAll = () => {
  return getKnex()(tables.user);
};

/**
 * Find user with the given `username`.
 *
 * @param {string} username - Username to look for.
 */
const findByName = (username) => {
  return getKnex()(tables.user).where("USERNAME", username).first();
};

/**
 * Find user_eid with the given `idnummer`.
 *
 * @param {string} idnummer - Idnummer to look for.
 */
const findByIdNummer = (idnummer) => {
  return getKnex()(tables.user_eid).where("IDNUMBER", idnummer).first();
};

const updateById = async (USERID, {
  TEMPLATE,
}) => {
  console.log(USERID);
  try {
    await getKnex()(tables.user)
      .update({
        TEMPLATE: JSON.stringify(TEMPLATE),
      })
      .where('USERID', USERID);
    return await findById(USERID);
  } catch (error) {
    const logger = getChildLogger('users-repo');
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
};

/**
 * Find user with the given `id`.
 *
 * @param {string} id - Id of the place to find.
 */
const findById = (id) => {
  return getKnex()(tables.user).where("USERID", id).first();
};
module.exports = {
  findAll,
  findById,
  findByName,
  findByIdNummer,
  updateById,
};
