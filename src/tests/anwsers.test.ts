import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import { CreateDataReplyDto, UpdateReplyDto } from '@dtos/answers.dto';
import ReplyRoute from '@routes/answers.route';
import { config } from 'dotenv';

config();

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Reply', () => {
  describe('[GET] /reply', () => {
    it('response findAll replys', async () => {
      const replysRoute = new ReplyRoute();
      const replys = replysRoute.replyController.replyService.reply;

      replys.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          userId: 1,
          upVote: 0,
          downVote: 0,
          reply: 'a@email.com',
        },
        {
          id: 2,
          userId: 1,
          upVote: 0,
          downVote: 0,
          reply: 'a3@email.com',
        },
        {
          id: 3,
          userId: 1,
          upVote: 0,
          downVote: 0,
          reply: '3@email.com',
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([replysRoute]);
      return request(app.getServer()).get(`${replysRoute.path}`).expect(200);
    });
  });

  describe('[GET] /reply/:id', () => {
    it('response findOne reply', async () => {
      const replyId = 1;

      const replysRoute = new ReplyRoute();
      const replys = replysRoute.replyController.replyService.reply;

      replys.findByPk = jest.fn().mockReturnValue({
        id: 1,
        reply: 'replyId',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([replysRoute]);
      return request(app.getServer()).get(`${replysRoute.path}/${replyId}`).expect(200);
    });
  });

  describe('[POST] /reply', () => {
    it('response Create reply', async () => {
      const replyData: CreateDataReplyDto = {
        reply: 'Test reply',
        questionId: 1,
      };

      const replysRoute = new ReplyRoute();
      const replys = replysRoute.replyController.replyService.reply;

      replys.findOne = jest.fn().mockReturnValue(null);
      replys.create = jest.fn().mockReturnValue({
        id: 1,
        userId: 1,
        upVote: 0,
        downVote: 0,
        reply: 'Test reply',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([replysRoute]);
      return request(app.getServer())
        .post(`${replysRoute.path}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(replyData)
        .expect(201);
    });
  });

  describe('[PUT] /reply/:id', () => {
    it('response Update reply', async () => {
      const replyId = 1;
      const replyData: UpdateReplyDto = {
        reply: 'Test reply',
        id: 1,
      };

      const replysRoute = new ReplyRoute();
      const replys = replysRoute.replyController.replyService.reply;

      replys.findByPk = jest.fn().mockReturnValue({
        id: replyId,
        reply: 'reply Data email',
      });
      replys.update = jest.fn().mockReturnValue([1]);
      replys.findByPk = jest.fn().mockReturnValue({
        id: replyId,
        reply: 'reply Data email',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([replysRoute]);
      return request(app.getServer())
        .put(`${replysRoute.path}/${replyId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(replyData)
        .expect(200);
    });
  });

  describe('[DELETE] /reply/:id', () => {
    it('response Delete reply', async () => {
      const replyId = 1;

      const replysRoute = new ReplyRoute();
      const replys = replysRoute.replyController.replyService.reply;

      replys.findByPk = jest.fn().mockReturnValue({
        id: replyId,
        reply: 'reply Data email',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([replysRoute]);
      return request(app.getServer()).delete(`${replysRoute.path}/${replyId}`).set('Authorization', `Bearer ${process.env.TEST_TOKEN}`).expect(200);
    });
  });
});
