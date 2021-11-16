import { NextFunction, Request, Response } from 'express';
import { CreateCommentDto, UpdateCommentDto } from '@dtos/comments.dto';
import { Comment } from '@interfaces/comments.interface';
import commentService from '@services/comments.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class CommentsController {
  public commentService = new commentService();

  public getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllCommentsData: Comment[] = await this.commentService.findAllComment();

      res.status(200).json({ data: findAllCommentsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCommentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CommentId = Number(req.params.id);
      const findOneCommentData: Comment = await this.commentService.findCommentById(CommentId);

      res.status(200).json({ data: findOneCommentData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      req.body.userId = req.user.id;
      const CommentData: CreateCommentDto = req.body;
      const createCommentData: Comment = await this.commentService.createComment(CommentData);

      res.status(201).json({ data: createCommentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CommentId = Number(req.params.id);
      const CommentData: UpdateCommentDto = req.body;
      const updateCommentData: Comment = await this.commentService.updateComment(CommentId, CommentData);

      res.status(200).json({ data: updateCommentData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CommentId = Number(req.params.id);
      const deleteCommentData: Comment = await this.commentService.deleteComment(CommentId);

      res.status(200).json({ data: deleteCommentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CommentsController;
