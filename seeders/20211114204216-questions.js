'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          userId: 1,
          upVote: 0,
          downVote: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          question: 'My first question',
        },
        {
          userId: 1,
          upVote: 0,
          downVote: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          question: 'My first question today',
        },
        {
          userId: 2,
          upVote: 0,
          downVote: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          question: 'My first question',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      'Questions',
      null,
      {
        userId: 1,
        upVote: 0,
        downVote: 0,
        question: 'My first question',
      },
      {
        userId: 1,
        upVote: 0,
        downVote: 0,
        question: 'My first question today',
      },
      {
        userId: 2,
        upVote: 0,
        downVote: 0,
        question: 'My first question',
      },
    );
  },
};
