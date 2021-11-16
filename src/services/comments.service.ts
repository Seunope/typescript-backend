import DB from '@databases';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { Reply } from '@/interfaces/answers.interface';
import { CreateCommentDto, UpdateCommentDto } from '@dtos/comments.dto';
import { Comment } from '@interfaces/comments.interface';
import constants from '@/utils/constants';

class CommentService {
  public comments = DB.Comments;
  public answer = DB.Answers;

  public async findAllComment(): Promise<Comment[]> {
    const allComment: Comment[] = await this.comments.findAll();
    return allComment;
  }

  public async findCommentById(CommentId: number): Promise<Comment> {
    if (isEmpty(CommentId)) throw new HttpException(400, constants.EMPTY_ID);

    const findComment: Comment = await this.comments.findByPk(CommentId);
    if (!findComment) throw new HttpException(409, "You're not Comment");

    return findComment;
  }

  public async createComment(CommentData: CreateCommentDto): Promise<Comment> {
    if (isEmpty(CommentData)) throw new HttpException(400, constants.EMPTY_BODY);

    const findAnswer: Reply = await this.answer.findOne({ where: { id: CommentData.answerId } });
    if (!findAnswer) throw new HttpException(409, `Answer ID: " ${CommentData.answerId}" is not found`);

    const findComment: Comment = await this.comments.findOne({
      where: { userId: CommentData.userId, answerId: CommentData.answerId, message: CommentData.message },
    });
    if (findComment) throw new HttpException(409, constants.ALREADY_EXIST);

    const createCommentData: Comment = await this.comments.create({ ...CommentData });
    return createCommentData;
  }

  public async updateComment(CommentId: number, CommentData: UpdateCommentDto): Promise<Comment> {
    if (isEmpty(CommentData)) throw new HttpException(400, constants.EMPTY_ID);

    const findComment: Comment = await this.comments.findByPk(CommentId);
    if (!findComment) throw new HttpException(409, constants.NOT_FOUND);

    await this.comments.update({ ...CommentData }, { where: { id: CommentId } });

    const updateComment: Comment = await this.comments.findByPk(CommentId);
    return updateComment;
  }

  public async deleteComment(CommentId: number): Promise<Comment> {
    if (isEmpty(CommentId)) throw new HttpException(400, constants.EMPTY_ID);

    const findComment: Comment = await this.comments.findByPk(CommentId);
    if (!findComment) throw new HttpException(409, constants.NOT_FOUND);

    await this.comments.destroy({ where: { id: CommentId } });

    return findComment;
  }
}

export default CommentService;
