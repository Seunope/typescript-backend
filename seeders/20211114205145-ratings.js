'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Ratings',
      [
        {
          userId: 1,
          upVote: 0,
          modelId: 1,
          downVote: 0,
          type: 'question',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          upVote: 0,
          modelId: 1,
          downVote: 0,
          type: 'reply',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          upVote: 0,
          modelId: 1,
          downVote: 0,
          type: 'question',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'Ratings',
      null,
      {
        userId: 1,
        upVote: 0,
        modelId: 1,
        downVote: 0,
        type: 'question',
      },
      {
        userId: 1,
        upVote: 0,
        modelId: 1,
        downVote: 0,
        type: 'reply',
      },
      {
        userId: 2,
        upVote: 0,
        modelId: 1,
        downVote: 0,
        type: 'question',
      },
    );
  },
};
