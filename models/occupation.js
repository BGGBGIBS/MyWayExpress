const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('occupation', {
    occupation_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    occupation_name: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    occupation_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'occupation',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_occupation",
        unique: true,
        fields: [
          { name: "occupation_id" },
        ]
      },
    ]
  });
};
