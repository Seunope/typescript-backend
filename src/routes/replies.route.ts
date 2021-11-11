import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import ReplyController from '@controllers/replies.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateReplyDto, CreateDataReplyDto, UpdateReplyDto } from '@dtos/replies.dto';

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
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateDataReplyDto, 'body'), this.replyController.createReply);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(UpdateReplyDto, 'body', true), this.replyController.updateReply);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.replyController.deleteReply);
  }
}

export default ReplyRoute;
