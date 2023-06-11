var Sequelize = require('sequelize');
var DataTypes = require("sequelize").DataTypes;


var { DB_PORT, DB_SERVER, DB_DATABASE, DB_USERNAME, DB_PASSWORD } = process.env;
var {connectionString, S_DB_CATALOG, S_DB_PROVIDER, S_DB_DATASOURCE, S_DB_USER_ID, S_DB_PASSWORD } = process.env;


const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_SERVER,
    port: DB_PORT,
    dialect: 'mssql',
    dialectModule: require('tedious'),
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false
    },
    dialectOptions: {
        options: {
          encrypt: true,
          useUTC: false,
          dateFirst: 1
        }
      }
  });



const db = {};
db.sequelize = sequelize; 
db.record = require('./record')(sequelize,DataTypes);
db.user = require('./user')(sequelize,DataTypes);
db.skill = require('./skill')(sequelize,DataTypes);
db.event = require('./event')(sequelize,DataTypes);
db.occupation = require('./occupation')(sequelize,DataTypes);
db.grade = require('./grade')(sequelize,DataTypes);
db.scale = require('./scale')(sequelize,DataTypes);
db.institution = require('./institution')(sequelize,DataTypes);

db.record.belongsTo(db.event, { as: "event", foreignKey: "event_id"});
db.event.hasMany(db.record, { as: "records", foreignKey: "event_id"});
db.record.belongsTo(db.grade, { as: "grade", foreignKey: "grade_id"});
db.grade.hasMany(db.record, { as: "records", foreignKey: "grade_id"});
db.event.belongsTo(db.institution, { as: "institution", foreignKey: "institution_id"});
db.institution.hasMany(db.event, { as: "events", foreignKey: "institution_id"});
db.event.belongsTo(db.occupation, { as: "occupation", foreignKey: "occupation_id"});
db.occupation.hasMany(db.event, { as: "events", foreignKey: "occupation_id"});
db.grade.belongsTo(db.scale, { as: "scale", foreignKey: "scale_id"});
db.scale.hasMany(db.grade, { as: "grades", foreignKey: "scale_id"});
db.record.belongsTo(db.skill, { as: "skill", foreignKey: "skill_id"});
db.skill.hasMany(db.record, { as: "records", foreignKey: "skill_id"});
db.record.belongsTo(db.user, { as: "user", foreignKey: "user_id"});
db.user.hasMany(db.record, { as: "records", foreignKey: "user_id"});


module.exports = db;