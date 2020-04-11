'use strict';
/*
  FechaCreación: 11/04/2020
  usuario: JQuintana
  Comentario: modelo de tabla formas de pagos.
  */
module.exports = (sequelize, DataTypes) => {
  const formasPagos = sequelize.define('formasPagos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING
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
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {});
  formasPagos.associate = function(models) {
    // associations can be defined here
    formasPagos.hasMany(models.Pagos,{foreignKey: 'idformaPago', sourceKey: 'id'});
  };
  return formasPagos;
};