import { NextFunction, Request, Response } from 'express';
import { CreateReplyDto, UpdateReplyDto } from '@dtos/answers.dto';
import { Reply } from '@interfaces/answers.interface';
import replyService from '@services/answers.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class ReplysController {
  public replyService = new replyService();

  public getReplys = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllReplysData: Reply[] = await this.replyService.findAllReply();

      res.status(200).json({ data: findAllReplysData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getReplyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ReplyId = Number(req.params.id);
      const findOneReplyData: Reply = await this.replyService.findReplyById(ReplyId);

      res.status(200).json({ data: findOneReplyData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createReply = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;

      req.body.upVote = 0;
      req.body.downVote = 0;
      req.body.userId = userId;

      const ReplyData: CreateReplyDto = req.body;
      const createReplyData: Reply = await this.replyService.createReply(ReplyData);

      res.status(201).json({ data: createReplyData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateReply = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ReplyId = Number(req.params.id);
      const ReplyData: UpdateReplyDto = req.body;

      const updateReplyData: Reply = await this.replyService.updateReply(ReplyId, ReplyData);

      res.status(200).json({ data: updateReplyData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteReply = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ReplyId = Number(req.params.id);
      const deleteReplyData: Reply = await this.replyService.deleteReply(ReplyId);

      res.status(200).json({ data: deleteReplyData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ReplysController;
