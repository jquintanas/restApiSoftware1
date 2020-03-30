'use strict';
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