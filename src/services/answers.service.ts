import DB from '@databases';
import { isEmpty } from '@utils/util';
import models from '@utils/models';
import { Reply } from '@interfaces/answers.interface';
import { HttpException } from '@exceptions/HttpException';
import { Question } from '@/interfaces/questions.interface';
import { CreateReplyDto, UpdateReplyDto } from '@dtos/answers.dto';
import NotificationService from './notifications.service';
import constants from '@/utils/constants';

class ReplyService {
  // public reply = DB.Answers;
  // public question = DB.Questions;
  // public subscription = DB.Subscriptions;

  public reply = models.Answers;
  public question = models.Questions;
  public subscription = models.Subscriptions;
  private relationship = { include: { model: models.Users } };

  public async findAllReply(): Promise<Reply[]> {
    const allReply: Reply[] = await this.reply.findAll({ ...this.relationship });
    return allReply;
  }

  public async findReplyById(ReplyId: number): Promise<Reply> {
    if (isEmpty(ReplyId)) throw new HttpException(400, constants.EMPTY_ID);

    const findReply: Reply = await this.reply.findByPk(ReplyId);
    if (!findReply) throw new HttpException(409, constants.NOT_FOUND);

    return findReply;
  }

  public async createReply(ReplyData: CreateReplyDto): Promise<Reply> {
    if (isEmpty(ReplyData)) throw new HttpException(400, constants.EMPTY_BODY);

    const findQuestion: Question = await this.question.findOne({ where: { id: ReplyData.questionId } });
    if (!findQuestion) throw new HttpException(409, `Question ID: " ${ReplyData.questionId}" is not found`);

    const findReply: Reply = await this.reply.findOne({ where: { reply: ReplyData.reply, questionId: ReplyData.questionId } });
    if (findReply) throw new HttpException(409, `You're reply is " ${ReplyData.reply}" already exists`);

    const createReplyData: Reply = await this.reply.create({ ...ReplyData });

    console.log('KK', process.env.NODE_ENV)
    if (process.env.NODE_ENV == 'test') return createReplyData;
    try {
      const findSubscription = await this.subscription.findAll({
        where: { questionId: ReplyData.questionId, isSubscribed: true },
      });

      if (!findSubscription) throw new HttpException(409, constants.NOT_FOUND);
      const notify = new NotificationService();
      findSubscription.map(async subscription => {
        await notify.createNotification({
          replyId: Number(createReplyData.id),
          subscriptionId: subscription.id,
          isViewed: false,
          userId: subscription.userId,
        });
      });
    } catch (error) {}

    return createReplyData;
  }
  public async updateReply(ReplyId: number, ReplyData: UpdateReplyDto): Promise<Reply> {
    if (isEmpty(ReplyData)) throw new HttpException(400, constants.EMPTY_ID);

    const findReply: Reply = await this.reply.findByPk(ReplyId);
    if (!findReply) throw new HttpException(409, constants.NOT_FOUND);

    await this.reply.update({ ...ReplyData }, { where: { id: ReplyId } });

    const updateReply: Reply = await this.reply.findByPk(ReplyId);
    return updateReply;
  }

  public async deleteReply(ReplyId: number): Promise<Reply> {
    if (isEmpty(ReplyId)) throw new HttpException(400, constants.EMPTY_ID);

    const findReply: Reply = await this.reply.findByPk(ReplyId);
    if (!findReply) throw new HttpException(409, constants.NOT_FOUND);

    await this.reply.destroy({ where: { id: ReplyId } });

    return findReply;
  }
}

export default ReplyService;
