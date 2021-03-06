'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Notifications',
      [
        {
          userId: 1,
          replyId: 1,
          isViewed: true,
          subscriptionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          replyId: 2,
          isViewed: true,
          subscriptionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          replyId: 2,
          isViewed: true,
          subscriptionId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'Notifications',
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
