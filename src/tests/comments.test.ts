import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import { CreateDataCommentDto, UpdateCommentDto } from '@dtos/comments.dto';
import CommentRoute from '@routes/comments.route';
import { config } from 'dotenv';

config();

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Comments', () => {
  describe('[GET] /comments', () => {
    it('response findAll comments', async () => {
      const commentsRoute = new CommentRoute();
      const comments = commentsRoute.commentsController.commentService.comments;

      comments.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          userId: 1,
          answerId: 2,
          message: 'Very good answers',
        },
        {
          id: 2,
          userId: 1,
          answerId: 2,
          message: 'Very good answers',
        },
        {
          id: 3,
          userId: 1,
          answerId: 2,
          message: 'Very good answers',
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([commentsRoute]);
      return request(app.getServer()).get(`${commentsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /comments/:id', () => {
    it('response findOne comment', async () => {
      const commentId = 1;

      const commentsRoute = new CommentRoute();
      const comments = commentsRoute.commentsController.commentService.comments;

      comments.findByPk = jest.fn().mockReturnValue({
        id: 1,
        comment: 'commentId',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([commentsRoute]);
      return request(app.getServer()).get(`${commentsRoute.path}/${commentId}`).expect(200);
    });
  });

  describe('[POST] /comments', () => {
    it('response Create comment', async () => {
      const commentData: CreateDataCommentDto = {
        answerId: 1,
        message: 'My first comment',
      };

      const commentsRoute = new CommentRoute();
      const comments = commentsRoute.commentsController.commentService.comments;

      comments.findOne = jest.fn().mockReturnValue(null);
      comments.create = jest.fn().mockReturnValue({
        userId: 1,
        answerId: 1,
        message: 'My first comment',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([commentsRoute]);
      return request(app.getServer())
        .post(`${commentsRoute.path}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(commentData)
        .expect(201);
    });
  });

  describe('[PUT] /comments/:id', () => {
    it('response Update comment', async () => {
      const commentId = 1;
      const commentData: UpdateCommentDto = {
        message: 'My first comment',
      };

      const commentsRoute = new CommentRoute();
      const comments = commentsRoute.commentsController.commentService.comments;

      comments.findByPk = jest.fn().mockReturnValue({
        id: commentId,
        message: 'My first comment',
      });
      comments.update = jest.fn().mockReturnValue([1]);
      comments.findByPk = jest.fn().mockReturnValue({
        id: commentId,
        message: 'My first comment',
      });

      console.log('enk', process.env.TEST_TOKEN);
      (Sequelize as any).authenticate = jest.fn();
      const app = new App([commentsRoute]);
      return request(app.getServer())
        .put(`${commentsRoute.path}/${commentId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(commentData)
        .expect(200);
    });
  });

  describe('[DELETE] /comments/:id', () => {
    it('response Delete comment', async () => {
      const commentId = 1;

      const commentsRoute = new CommentRoute();
      const comments = commentsRoute.commentsController.commentService.comments;

      comments.findByPk = jest.fn().mockReturnValue({
        id: commentId,
        userId: 1,
        answerId: 2,
        message: 'Very good answers',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([commentsRoute]);
      return request(app.getServer())
        .delete(`${commentsRoute.path}/${commentId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .expect(200);
    });
  });
});
