import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import CommentsController from '@controllers/comments.controller';
import { CreateDataCommentDto, UpdateCommentDto } from '@dtos/comments.dto';

class CommentsRoute implements Routes {
  public path = '/comments';
  public router = Router();
  public commentsController = new CommentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.commentsController.getComments);
    this.router.get(`${this.path}/:id(\\d+)`, this.commentsController.getCommentById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateDataCommentDto, 'body'), this.commentsController.createComment);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(UpdateCommentDto, 'body', true),
      this.commentsController.updateComment,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.commentsController.deleteComment);
  }
}

export default CommentsRoute;
