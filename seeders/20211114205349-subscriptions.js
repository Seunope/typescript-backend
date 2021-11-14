'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Subscriptions',
      [
        {
          userId: 1,
          questionId: 1,
          isSubscribe: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          questionId: 2,
          isSubscribe: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          questionId: 1,
          isSubscribe: true,
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
        isSubscribe: true,
      },
      {
        userId: 1,
        questionId: 2,
        isSubscribe: false,
      },
      {
        userId: 2,
        questionId: 1,
        isSubscribe: true,
      },
    );
  },
};
