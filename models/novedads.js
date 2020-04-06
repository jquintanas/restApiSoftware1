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
  const Novedads = sequelize.define('Novedads', {
    idnovedad: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idusuarioReporta: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    idusuarioReporta: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    descripcion: {
      allowNull: false,
      type: DataTypes.STRING
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
  Novedads.associate = function(models) {
    // associations can be defined here
  };
  return Novedads;
};