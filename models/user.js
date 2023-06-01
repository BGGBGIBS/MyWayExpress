const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    user_firstname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_lastname: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    user_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    user_address: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    user_role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "user"
    },
    user_password: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_user",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
