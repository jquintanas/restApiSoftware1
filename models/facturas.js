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
  const Facturas = sequelize.define('Facturas', {
    idfactura: DataTypes.INTEGER,
    idpedido: DataTypes.INTEGER,
    idpago: DataTypes.INTEGER
  }, {});
  Facturas.associate = function(models) {
    // associations can be defined here
  };
  return Facturas;
};