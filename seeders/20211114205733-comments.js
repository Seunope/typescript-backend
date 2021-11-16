'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          userId: 1,
          answerId: 1,
          message: 'good answers',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          answerId: 1,
          message: 'good answers to',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          answerId: 2,
          message: 'very good answers',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'Comments',
      null,
      {
        userId: 1,
        replyId: 1,
        isViewed: true,
        subscriptionId: 1,
      },
      {
        userId: 1,
        replyId: 2,
        isViewed: true,
        subscriptionId: 1,
      },
      {
        userId: 2,
        replyId: 2,
        isViewed: true,
        subscriptionId: 1,
      },
    );
  },
};
