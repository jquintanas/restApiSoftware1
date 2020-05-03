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

      /*
      Fcreación: 11/04/2020
      Ucreación: Francesca Man Ging
      Comentarios: se asocia el idpedido de la tabla pedido porque es foreignkey
      Comentarios: se asocia el idpago de la tabla pago porque es foreignkey
      */

    Facturas.associate = function(models) {
     /* Facturas.belongsTo(models.pedidos,{
          foreignKey: 'idpedido',
          foreignKeyConstraint: true
      });

      Facturas.belongsTo(models.pagos, { 
        foreignKey: 'idPago', 
        foreignKeyConstraint: true
      });*/
    };
  return Facturas;
};