import { Router } from 'express';
import ReplyController from '@controllers/replies.controller';
import { CreateReplyDto, CreateDataReplyDto } from '@dtos/replies.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ReplyRoute implements Routes {
  public path = '/reply';
  public router = Router();
  public replyController = new ReplyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.replyController.getReplys);
    this.router.get(`${this.path}/:id(\\d+)`, this.replyController.getReplyById);
    this.router.post(`${this.path}`, validationMiddleware(CreateDataReplyDto, 'body'), this.replyController.createReply);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateReplyDto, 'body', true), this.replyController.updateReply);
    this.router.delete(`${this.path}/:id(\\d+)`, this.replyController.deleteReply);
  }
}

export default ReplyRoute;
