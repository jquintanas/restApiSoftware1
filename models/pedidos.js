'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pedidos = sequelize.define('Pedidos', {
    idpedido: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    idcompra: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    idproducto: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    cantidad: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    subtotal: {
      allowNull: false,
      type: Sequelize.FLOAT
    },
    cubiertos: {
      allowNull: false,
      type: Sequelize.BOOLEAN
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
  Pedidos.associate = function(models) {
    // associations can be defined here
  };
  return Pedidos;
};