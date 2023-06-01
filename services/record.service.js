var recordDTO = require("../dto/record.dto");
var allDTO = require("../dto/all.dto");
const { QueryTypes } = require("sequelize");
var { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_SERVER } = process.env;
var Sequelize = require("sequelize");
var sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_SERVER,
  dialect: "mssql",
});
var db = require("../models");

var recordService = {
  getAll: async (offset, limit) => {
    const { rows, count } = await db.record.findAndCountAll({
      distinct: true,
      offset: offset,
      limit: limit,
    });
    return {
      records: rows.map((record) => new recordDTO(record)),
      count,
    };
  },
  getById: async (id) => {
    console.log(id);
    const record = await db.record.findByPk(id);
    console.log(record);
    return record ? new recordDTO(record) : null;
  },
  getByUserId: async (userId) => {
    const records = await db.record.findAll({
      include: [
        {
          model: db.user,
          as: "user",
          where: { user_id: userId },
          attributes: ["user_firstname", "user_lastname", "user_email"],
        },
        {
          model: db.event,
          as: "event",
          include: [
            {
              model: db.occupation,
              as: "occupation",
              attributes: ["occupation_name", "occupation_description"],
            },
            {
              model: db.institution,
              as: "institution",
              attributes: [
                "institution_name",
                "institution_type",
                "institution_address",
              ],
            },
          ],
          attributes: ["event_begin", "event_end"],
        },
        {
          model: db.grade,
          as: "grade",
          include: [
            {
              model: db.scale,
              as: "scale",
              attributes: ["scale_min", "scale_max"],
            },
          ],
          attributes: ["grade_name", "grade_value"],
        },
      ],
      attributes: ["record_id"],
    });
    return records;
  },
  create: async (toAdd) => {
    const transaction = await db.sequelize.transaction();

    let record;
    try {
      console.log(toAdd);
      record = await db.record.create(toAdd, { transaction });
      await transaction.commit();

      console.log(record.record_id);
      const addedrecord = await db.record.findByPk(record.record_id);

      return addedrecord ? new recordDTO(addedrecord) : null;
    } catch (err) {
      console.log(err);
      await transaction.rollback();
      return null;
    }
  },
  createAll: async (toAdd) => {
    try {
      const {
        user_id,
        occupation_name,
        occupation_description,
        skill_name,
        skill_description,
        skill_type,
        institution_name,
        institution_type,
        institution_address,
        event_begin,
        event_end,
        event_type,
        grade_name,
        grade_value,
        scale_min,
        scale_max,
      } = toAdd;

      console.log("CREATE ALL : ", toAdd);

      const myquery = await sequelize.query(
        "EXEC AddNewRecord @user_id=:user_id, @occupation_name=:occupation_name, @occupation_description=:occupation_description, @skill_name=:skill_name, @skill_description=:skill_description, @skill_type=:skill_type, @institution_name=:institution_name, @institution_type=:institution_type, @institution_address=:institution_address, @event_begin=:event_begin, @event_end=:event_end, @event_type=:event_type, @grade_name=:grade_name, @grade_value=:grade_value, @scale_min=:scale_min, @scale_max=:scale_max",
        {
          replacements: {
            user_id,
            occupation_name,
            occupation_description,
            skill_name,
            skill_description,
            skill_type,
            institution_name,
            institution_type,
            institution_address,
            event_begin,
            event_end,
            event_type,
            grade_name,
            grade_value,
            scale_min,
            scale_max,
          },
        }
      );
      console.log("QUERY : ", myquery);
    } catch (error) {
      console.error(error);
    }
  },
  update: async (id, toUpdate) => {
    const record = await db.record.findByPk(id);
    if (record) {
      await record.update(toUpdate);
      return record;
    }
    return null;
  },
  delete: async (id) => {
    const record = await db.record.findByPk(id);
    if (record) {
      await record.destroy();
      return record;
    }
    return null;
  },
};

module.exports = recordService;
