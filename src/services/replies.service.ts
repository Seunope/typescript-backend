import DB from '@databases';
import { CreateReplyDto } from '@dtos/replies.dto';
import { HttpException } from '@exceptions/HttpException';
import { Reply } from '@interfaces/replies.interface';
import { isEmpty } from '@utils/util';

class ReplyService {
  public reply = DB.Replies;

  public async findAllReply(): Promise<Reply[]> {
    const allReply: Reply[] = await this.reply.findAll();
    return allReply;
  }

  public async findReplyById(ReplyId: number): Promise<Reply> {
    if (isEmpty(ReplyId)) throw new HttpException(400, "You're not ReplyId");

    const findReply: Reply = await this.reply.findByPk(ReplyId);
    if (!findReply) throw new HttpException(409, "You're not Reply");

    return findReply;
  }

  public async createReply(ReplyData: CreateReplyDto): Promise<Reply> {
    if (isEmpty(ReplyData)) throw new HttpException(400, "You're not ReplyData");

    const findReply: Reply = await this.reply.findOne({ where: { reply: ReplyData.reply } });
    if (findReply) throw new HttpException(409, `You're reply is " ${ReplyData.reply}" already exists`);

    const createReplyData: Reply = await this.reply.create({ ...ReplyData });
    return createReplyData;
  }
  public async updateReply(ReplyId: number, ReplyData: CreateReplyDto): Promise<Reply> {
    if (isEmpty(ReplyData)) throw new HttpException(400, "You're not ReplyData");

    const findReply: Reply = await this.reply.findByPk(ReplyId);
    if (!findReply) throw new HttpException(409, "You're not Reply");

    await this.reply.update({ ...ReplyData }, { where: { id: ReplyId } });

    const updateReply: Reply = await this.reply.findByPk(ReplyId);
    return updateReply;
  }

  public async deleteReply(ReplyId: number): Promise<Reply> {
    if (isEmpty(ReplyId)) throw new HttpException(400, "You're not ReplyId");

    const findReply: Reply = await this.reply.findByPk(ReplyId);
    if (!findReply) throw new HttpException(409, "You're not Reply");

    await this.reply.destroy({ where: { id: ReplyId } });

    return findReply;
  }
}

export default ReplyService;
