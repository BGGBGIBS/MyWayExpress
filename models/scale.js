const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('scale', {
    scale_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    scale_min: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scale_max: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'scale',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_scale",
        unique: true,
        fields: [
          { name: "scale_id" },
        ]
      },
    ]
  });
};
