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
  const compras = sequelize.define('compras', {
    
    idcompra: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    idusuario: {
      allowNull: false,
      type: Sequelize.STRING
    },
    fechacompra: {
      allowNull: false,
      type: Sequelize.DATE
    },
    idformaEntrega: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    horaEntrega: {
      allowNull: false,
      type: Sequelize.TIME
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
  compras.associate = function(models) {
    // associations can be defined here
  };
  return compras;
};