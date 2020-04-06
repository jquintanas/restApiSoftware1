/*
  Fcreación: -----
  Fmodificación: 1/04/2020
  Ucreación: ------
  Umodificación: Danny 
  Comentarios: se añadió una variable para definir el sequelize ya que generaba conflicto al momento
  de iniciar el server
  UModificacion: JQuintana
  Fecha: 6/04/2020
  Comentario: se elimina variable sequelize para cambiarla por DataType, correccion de error de migracion de base de datos.
  */
'use strict';
var Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Pedidos = sequelize.define('Pedidos', {
    idpedido: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idcompra: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    idproducto: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    cantidad: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    subtotal: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    cubiertos: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
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