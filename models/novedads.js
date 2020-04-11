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

  UModificacion: JQuintana
  Fecha: 11/04/2020
  Comentario: Se agregan relaciones entre modelos
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
      type: DataTypes.STRING,
      references: {
        model: "Usuarios",
        key: "cedula"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
    },
    idusuarioReportado: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: "Usuarios",
        key: "cedula"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
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
  Novedads.associate = function (models) {
    // associations can be defined here
    Novedads.belongsTo(models.Usuarios, { foreignKey: 'idusuarioReporta', foreignKeyConstraint: true, targetKey: 'cedula' });

    Novedads.belongsTo(models.Usuarios, { foreignKey: 'idusuarioReportado', foreignKeyConstraint: true, targetKey: 'cedula' });
  };
  return Novedads;
};