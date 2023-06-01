const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('record', {
    record_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    event_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'event',
        key: 'event_id'
      }
    },
    skill_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'skill',
        key: 'skill_id'
      }
    },
    grade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'grade',
        key: 'grade_id'
      }
    }
  }, {
    sequelize,
    tableName: 'record',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_record",
        unique: true,
        fields: [
          { name: "record_id" },
        ]
      },
    ]
  });
};
