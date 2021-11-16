'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Subscriptions',
      [
        {
          userId: 1,
          questionId: 1,
          isSubscribed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          questionId: 2,
          isSubscribed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          questionId: 1,
          isSubscribed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'Subscriptions',
      null,
      {
        userId: 1,
        questionId: 1,
        isSubscribed: true,
      },
      {
        userId: 1,
        questionId: 2,
        isSubscribed: false,
      },
      {
        userId: 2,
        questionId: 1,
        isSubscribed: true,
      },
    );
  },
};
