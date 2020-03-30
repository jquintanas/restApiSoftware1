'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('compras', {
      idcompra: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idusuario: {
        type: Sequelize.STRING
      },
      fechacompra: {
        type: Sequelize.DATE
      },
      idformaEntrega: {
        type: Sequelize.INTEGER
      },
      horaEntrega: {
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('compras');
  }
};