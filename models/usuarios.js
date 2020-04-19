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
  const Usuarios = sequelize.define('Usuarios', {
    cedula: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    nombre: {
      allowNull: false,
      type: DataTypes.STRING
    },
    apellido: {
      allowNull: false,
      type: DataTypes.STRING
    },
    telefono: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    direccion: {
      allowNull: false,
      type: DataTypes.STRING
    },
    contrasenia: {
      allowNull: false,
      type: DataTypes.STRING
    },
    rol: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Rols",
        key: "idrol"
      },
      onUpdate: "cascade",
      onDelete: "cascade"
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
  Usuarios.associate = function(models) {
    // associations can be defined here

    Usuarios.hasMany(models.Novedads, {foreignKey: 'idusuarioReporta', sourceKey: 'cedula'});

    Usuarios.hasMany(models.Novedads, {foreignKey: 'idusuarioReportado', sourceKey: 'cedula'});

    Usuarios.belongsTo(models.Rols, { foreignKey: 'rol', foreignKeyConstraint: true, targetKey: 'idrol' });
  };
  return Usuarios;
};