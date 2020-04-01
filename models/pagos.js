/*
  Fcreación: -----
  Fmodificación: 1/04/2020
  Ucreación: ------
  Umodificación: Danny 
  Comentarios: se añadió una variable para definir el sequelize ya que generaba conflicto al momento
  de iniciar el server
  */
'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Pagos = sequelize.define('Pagos', {
    idPago: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    idformaPago: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    total: {
      allowNull: false,
      type: Sequelize.FLOAT
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
  Pagos.associate = function(models) {
    // associations can be defined here
  };
  return Pagos;
};