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
module.exports = (sequelize, DataTypes) => {
  const compras = sequelize.define('compras', {
    
    idcompra: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idusuario: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fechacompra: {
      allowNull: false,
      type: DataTypes.DATE
    },
    entregaDomocilio: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    horaEntrega: {
      allowNull: false,
      type: DataTypes.TIME
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
  compras.associate = function(models) {
    // associations can be defined here
  };
  return compras;
};