const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event', {
    event_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    event_begin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    event_end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    occupation_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'occupation',
        key: 'occupation_id'
      }
    },
    institution_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'institution',
        key: 'institution_id'
      }
    },
    event_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'event',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_event",
        unique: true,
        fields: [
          { name: "event_id" },
        ]
      },
    ]
  });
};
