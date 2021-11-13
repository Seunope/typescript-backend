import DB from '@databases';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';
import { Question } from '@/interfaces/questions.interface';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '@dtos/subscriptions.dto';
import { Subscription } from '@interfaces/subscriptions.interface';

class SubscriptionService {
  public subscriptions = DB.Subscriptions;
  public question = DB.Questions;

  public async findAllSubscription(): Promise<Subscription[]> {
    const allSubscription: Subscription[] = await this.subscriptions.findAll();
    return allSubscription;
  }

  public async findSubscriptionById(SubscriptionId: number): Promise<Subscription> {
    if (isEmpty(SubscriptionId)) throw new HttpException(400, "You're not SubscriptionId");

    const findSubscription: Subscription = await this.subscriptions.findByPk(SubscriptionId);
    if (!findSubscription) throw new HttpException(409, "You're not Subscription");

    return findSubscription;
  }

  public async createSubscription(SubscriptionData: CreateSubscriptionDto): Promise<Subscription> {
    if (isEmpty(SubscriptionData)) throw new HttpException(400, 'Input wrong');

    const findQuestion: Question = await this.question.findOne({ where: { id: SubscriptionData.questionId } });
    if (!findQuestion) throw new HttpException(409, `Question ID: " ${SubscriptionData.questionId}" is not found`);

    const findSubscription: Subscription = await this.subscriptions.findOne({
      where: { userId: SubscriptionData.userId, questionId: SubscriptionData.questionId },
    });
    if (findSubscription) throw new HttpException(409, 'You have already subscribed');

    const createSubscriptionData: Subscription = await this.subscriptions.create({ ...SubscriptionData });
    return createSubscriptionData;
  }

  public async updateSubscription(SubscriptionId: number, SubscriptionData: UpdateSubscriptionDto): Promise<Subscription> {
    if (isEmpty(SubscriptionData)) throw new HttpException(400, 'Input wrong');

    const findSubscription: Subscription = await this.subscriptions.findByPk(SubscriptionId);
    if (!findSubscription) throw new HttpException(409, "You're not Subscription");

    await this.subscriptions.update({ ...SubscriptionData }, { where: { id: SubscriptionId } });

    const updateSubscription: Subscription = await this.subscriptions.findByPk(SubscriptionId);
    return updateSubscription;
  }

  public async deleteSubscription(SubscriptionId: number): Promise<Subscription> {
    if (isEmpty(SubscriptionId)) throw new HttpException(400, 'Not SubscriptionId');

    const findSubscription: Subscription = await this.subscriptions.findByPk(SubscriptionId);
    if (!findSubscription) throw new HttpException(409, 'Not Subscription');

    await this.subscriptions.destroy({ where: { id: SubscriptionId } });

    return findSubscription;
  }
}

export default SubscriptionService;
