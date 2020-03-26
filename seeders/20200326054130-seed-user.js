'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      name: 'user1',
      email: 'user1@example.com',
      password: '$2a$10$hWhEke/znuJPu8c1wQ6n6.rU/0dyiDykpS/UZQr05Z7bq/TY4bTgC',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', [{
      name: 'user1'
    }])
  }
};
