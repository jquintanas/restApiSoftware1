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
  const Novedads = sequelize.define('Novedads', {
    idnovedad: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    idusuarioReporta: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    idusuarioReporta: {
      allowNull: false,
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
  Novedads.associate = function(models) {
    // associations can be defined here
  };
  return Novedads;
};