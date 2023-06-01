const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grade', {
    grade_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    grade_name: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    grade_value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    scale_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'scale',
        key: 'scale_id'
      }
    }
  }, {
    sequelize,
    tableName: 'grade',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_grade",
        unique: true,
        fields: [
          { name: "grade_id" },
        ]
      },
    ]
  });
};
