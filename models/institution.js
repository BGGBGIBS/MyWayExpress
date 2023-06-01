const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('institution', {
    institution_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    institution_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    institution_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    institution_address: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'institution',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_institution",
        unique: true,
        fields: [
          { name: "institution_id" },
        ]
      },
    ]
  });
};
