'use strict';
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