'use strict';
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