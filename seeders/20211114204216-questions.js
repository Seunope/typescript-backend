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
          tags: 'java, html',
          question: 'My first question',
          title: 'How to user maps for db connection',
        },
        {
          userId: 1,
          upVote: 0,
          downVote: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          tags: 'java, html',
          question: 'My first question',
          title: 'How to user maps for db connection',
        },
        {
          userId: 2,
          upVote: 0,
          downVote: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          tags: 'java, html',
          question: 'My first question',
          title: 'How to user maps for db connection',
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
