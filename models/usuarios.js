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
  const Usuarios = sequelize.define('Usuarios', {
    cedula: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING
    },
    nombre: {
      allowNull: false,
      type: Sequelize.STRING
    },
    apellido: {
      allowNull: false,
      type: Sequelize.STRING
    },
    telefono: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    direccion: {
      allowNull: false,
      type: Sequelize.STRING
    },
    contrasenia: {
      allowNull: false,
      type: Sequelize.STRING
    },
    rol: {
      allowNull: false,
      type: Sequelize.INTEGER
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
  Usuarios.associate = function(models) {
    // associations can be defined here
  };
  return Usuarios;
};