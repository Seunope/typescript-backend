import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import { SetQuestionDto } from '@dtos/questions.dto';
import QuestionRoute from '@routes/questions.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Questions', () => {
  describe('[GET] /questions', () => {
    it('response findAll questions', async () => {
      const questionsRoute = new QuestionRoute();
      const questions = questionsRoute.questionsController.questionService.questions;

      questions.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          userId: 1,
          upVote: 2,
          downVote: 3,
          question: 'a@email.com',
        },
        {
          id: 2,
          userId: 1,
          upVote: 2,
          downVote: 3,
          question: 'a3@email.com',
        },
        {
          id: 3,
          userId: 1,
          upVote: 0,
          downVote: 3,
          question: '3@email.com',
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([questionsRoute]);
      return request(app.getServer()).get(`${questionsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /questions/:id', () => {
    it('response findOne question', async () => {
      const questionId = 1;

      const questionsRoute = new QuestionRoute();
      const questions = questionsRoute.questionsController.questionService.questions;

      questions.findByPk = jest.fn().mockReturnValue({
        id: 1,
        question: 'questionId',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([questionsRoute]);
      return request(app.getServer()).get(`${questionsRoute.path}/${questionId}`).expect(200);
    });
  });

  describe('[POST] /questions', () => {
    it('response Create question', async () => {
      const questionData: SetQuestionDto = {
        question: 'Test question',
      };

      const questionsRoute = new QuestionRoute();
      const questions = questionsRoute.questionsController.questionService.questions;

      questions.findOne = jest.fn().mockReturnValue(null);
      questions.create = jest.fn().mockReturnValue({
        id: 1,
        userId: 1,
        upVote: 0,
        downVote: 0,
        question: 'Test question',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([questionsRoute]);
      return request(app.getServer())
        .post(`${questionsRoute.path}`)
        .send(questionData)
        .expect(201)
        .set(
          'authorization',
          `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjM2ODE1OTA4LCJleHAiOjE2MzY4MTk1MDh9.T9h2oKvaa8Z2PbNWClsHIneAKUNjbeq3olyARB477E4`,
        );
    });
  });

  describe('[PUT] /questions/:id', () => {
    it('response Update question', async () => {
      const questionId = 1;
      const questionData: SetQuestionDto = {
        question: 'Test question',
      };

      const questionsRoute = new QuestionRoute();
      const questions = questionsRoute.questionsController.questionService.questions;

      questions.findByPk = jest.fn().mockReturnValue({
        id: questionId,
        question: 'question Data email',
      });
      questions.update = jest.fn().mockReturnValue([1]);
      questions.findByPk = jest.fn().mockReturnValue({
        id: questionId,
        question: 'question Data email',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([questionsRoute]);
      return request(app.getServer()).put(`${questionsRoute.path}/${questionId}`).send(questionData).expect(200);
    });
  });

  describe('[DELETE] /questions/:id', () => {
    it('response Delete question', async () => {
      const questionId = 1;

      const questionsRoute = new QuestionRoute();
      const questions = questionsRoute.questionsController.questionService.questions;

      questions.findByPk = jest.fn().mockReturnValue({
        id: questionId,
        question: 'question Data email',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([questionsRoute]);
      return request(app.getServer()).delete(`${questionsRoute.path}/${questionId}`).expect(200);
    });
  });
});
