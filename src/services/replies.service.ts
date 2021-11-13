import DB from '@databases';
import { isEmpty } from '@utils/util';
import { Reply } from '@interfaces/replies.interface';
import { HttpException } from '@exceptions/HttpException';
import { Question } from '@/interfaces/questions.interface';
import { CreateReplyDto, UpdateReplyDto } from '@dtos/replies.dto';

class ReplyService {
  public reply = DB.Replies;
  public question = DB.Questions;

  public async findAllReply(): Promise<Reply[]> {
    const allReply: Reply[] = await this.reply.findAll();
    return allReply;
  }

  public async findReplyById(ReplyId: number): Promise<Reply> {
    if (isEmpty(ReplyId)) throw new HttpException(400, 'Wrong input');

    const findReply: Reply = await this.reply.findByPk(ReplyId);
    if (!findReply) throw new HttpException(409, "You're not Reply");

    return findReply;
  }

  public async createReply(ReplyData: CreateReplyDto): Promise<Reply> {
    if (isEmpty(ReplyData)) throw new HttpException(400, 'Wrong input');

    const findQuestion: Question = await this.question.findOne({ where: { id: ReplyData.questionId } });
    if (!findQuestion) throw new HttpException(409, `Question ID: " ${ReplyData.questionId}" is not found`);

    const findReply: Reply = await this.reply.findOne({ where: { reply: ReplyData.reply, questionId: ReplyData.questionId } });
    if (findReply) throw new HttpException(409, `You're reply is " ${ReplyData.reply}" already exists`);

    const createReplyData: Reply = await this.reply.create({ ...ReplyData });
    return createReplyData;
  }
  public async updateReply(ReplyId: number, ReplyData: UpdateReplyDto): Promise<Reply> {
    if (isEmpty(ReplyData)) throw new HttpException(400, 'Wrong input');

    const findReply: Reply = await this.reply.findByPk(ReplyId);
    if (!findReply) throw new HttpException(409, ' Reply ID not found');

    await this.reply.update({ ...ReplyData }, { where: { id: ReplyId } });

    const updateReply: Reply = await this.reply.findByPk(ReplyId);
    return updateReply;
  }

  public async deleteReply(ReplyId: number): Promise<Reply> {
    if (isEmpty(ReplyId)) throw new HttpException(400, 'ReplyId not found');

    const findReply: Reply = await this.reply.findByPk(ReplyId);
    if (!findReply) throw new HttpException(409, 'Reply not found');

    await this.reply.destroy({ where: { id: ReplyId } });

    return findReply;
  }
}

export default ReplyService;
