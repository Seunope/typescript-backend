'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Notifications',
      [
        {
          replyId: 1,
          isViewed: true,
          subscriptionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          replyId: 2,
          isViewed: true,
          subscriptionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          replyId: 2,
          isViewed: true,
          subscriptionId: 1,
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
        replyId: 1,
        isViewed: true,
        subscriptionId: 1,
      },
      {
        replyId: 2,
        isViewed: true,
        subscriptionId: 1,
      },
      {
        replyId: 2,
        isViewed: true,
        subscriptionId: 1,
      },
    );
  },
};
