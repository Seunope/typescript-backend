'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Replies',
      [
        {
          userId: 1,
          upVote: 0,
          downVote: 0,
          questionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          reply: 'first reply toady',
        },
        {
          userId: 1,
          upVote: 0,
          downVote: 0,
          questionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          reply: 'first reply toady now',
        },
        {
          userId: 2,
          upVote: 0,
          downVote: 0,
          questionId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          reply: 'first reply toady 1',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'Replies',
      null,
      {
        userId: 1,
        upVote: 0,
        downVote: 0,
        questionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        upVote: 0,
        downVote: 0,
        questionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        upVote: 0,
        downVote: 0,
        questionId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    );
  },
};
