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