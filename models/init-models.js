var DataTypes = require("sequelize").DataTypes;
var _event = require("./event");
var _grade = require("./grade");
var _institution = require("./institution");
var _occupation = require("./occupation");
var _record = require("./record");
var _scale = require("./scale");
var _skill = require("./skill");
var _user = require("./user");

function initModels(sequelize) {
  var event = _event(sequelize, DataTypes);
  var grade = _grade(sequelize, DataTypes);
  var institution = _institution(sequelize, DataTypes);
  var occupation = _occupation(sequelize, DataTypes);
  var record = _record(sequelize, DataTypes);
  var scale = _scale(sequelize, DataTypes);
  var skill = _skill(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  record.belongsTo(event, { as: "event", foreignKey: "event_id"});
  event.hasMany(record, { as: "records", foreignKey: "event_id"});
  record.belongsTo(grade, { as: "grade", foreignKey: "grade_id"});
  grade.hasMany(record, { as: "records", foreignKey: "grade_id"});
  event.belongsTo(institution, { as: "institution", foreignKey: "institution_id"});
  institution.hasMany(event, { as: "events", foreignKey: "institution_id"});
  event.belongsTo(occupation, { as: "occupation", foreignKey: "occupation_id"});
  occupation.hasMany(event, { as: "events", foreignKey: "occupation_id"});
  grade.belongsTo(scale, { as: "scale", foreignKey: "scale_id"});
  scale.hasMany(grade, { as: "grades", foreignKey: "scale_id"});
  record.belongsTo(skill, { as: "skill", foreignKey: "skill_id"});
  skill.hasMany(record, { as: "records", foreignKey: "skill_id"});

  return {
    event,
    grade,
    institution,
    occupation,
    record,
    scale,
    skill,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
