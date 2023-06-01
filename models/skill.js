const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('skill', {
    skill_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    skill_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    skill_description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    skill_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'skill',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_skill",
        unique: true,
        fields: [
          { name: "skill_id" },
        ]
      },
    ]
  });
};
