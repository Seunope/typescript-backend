import { NextFunction, Request, Response } from 'express';
import { CreateReplyDto } from '@dtos/replies.dto';
import { Reply } from '@interfaces/replies.interface';
import replyService from '@services/replies.service';

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

  public createReply = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //const userId = req.user.id;

      req.body.upVote = 0;
      req.body.downVote = 0;
      req.body.userId = 2;

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
      const ReplyData: CreateReplyDto = req.body;
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
