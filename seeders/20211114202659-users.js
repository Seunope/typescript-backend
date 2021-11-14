'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          password,
          lastName: 'Doe',
          firstName: 'John',
          username: 'jonOO1',
          email: 'user1@g.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          password,
          lastName: 'Bola',
          firstName: 'John',
          username: 'jonOO2',
          email: 'user2@g.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          password,
          lastName: 'Joy',
          firstName: 'John',
          username: 'jonOO3',
          email: 'user3@g.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          password,
          lastName: 'Doe',
          firstName: 'John',
          username: 'jonOO3',
          email: 'user3@g.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'Users',
      null,
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'user1@g.com',
      },
      {
        firstName: 'Tolu',
        lastName: 'Doe',
        email: 'user12@g.com',
      },
      {
        firstName: 'Bola',
        lastName: 'Doe',
        email: 'user3@g.com',
      },
      {
        firstName: 'Aanu',
        lastName: 'Doe',
        email: 'user3@g.com',
      },
    );
  },
};
