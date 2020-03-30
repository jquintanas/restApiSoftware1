'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rols = sequelize.define('Rols', {
    idrol: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    descripcion: {
      allowNull: false,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {});
  Rols.associate = function(models) {
    // associations can be defined here
  };
  return Rols;
};