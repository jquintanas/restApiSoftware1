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

  /*
  Fcreación: 30/03/2020
  Fmodificación: 30/03/2020
  Ucreación: Danny
  Umodificación: Danny
  Comentarios: se asocia el idcompra de la tabla compras porque es foreignkey
  Parametros de entrada: modelo compras, el campo idcompra y como se mostrará.
  */
  Pedidos.associate = function(models) {
    // associations can be defined here
    Pedidos.belongsTo(models.compras,{
      foreignKey: 'idcompra',
      as: 'Codigo_Compra'
    });

  };
  return Pedidos;
};