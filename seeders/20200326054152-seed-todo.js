'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const db = require('../models')
    const User = db.User

    await User.findOne({
      where: {
        name: 'user1'
      }
    })
      .then((user) => {
        return queryInterface.bulkInsert('todos', [{
          name: 'Fix bicycle',
          done: false,
          UserId: user.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Do laundry',
          done: true,
          UserId: user.id,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Take out the garbage',
          done: false,
          UserId: user.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }]);
      })

  },

  down: async (queryInterface, Sequelize) => {

    const db = require('../models')
    const User = db.User

    await User.findOne({
      where: {
        name: 'user1'
      }
    })
      .then((user) => {
        return queryInterface.bulkDelete('todos', [{
          UserId: user.id,
        }])
      })

  }
};
