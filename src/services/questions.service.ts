import DB from '@databases';
import models from '@utils/models';
import { CreateQuestionDto, SetQuestionDto } from '@dtos/questions.dto';
import { HttpException } from '@exceptions/HttpException';
import { Question } from '@interfaces/questions.interface';
import { isEmpty } from '@utils/util';
import Constants from '@utils/constants';

class QuestionService {
  //public questions = DB.Questions;
  public questions = models.Questions;
  private relationship = { include: { model: models.Users } };

  public async findAllQuestion(): Promise<Question[]> {
    const allQuestion: Question[] = await this.questions.findAll({ ...this.relationship });

    return allQuestion;
  }

  public async findUserQuestions(UserId: number): Promise<Question[]> {
    const userQuestions: Question[] = await this.questions.findAll({ where: { userId: UserId }, ...this.relationship });

    return userQuestions;
  }

  public async findQuestionById(QuestionId: number): Promise<Question> {
    if (isEmpty(QuestionId)) throw new HttpException(400, Constants.EMPTY_ID);

    const findQuestion: Question = await this.questions.findByPk(QuestionId, this.relationship);
    if (!findQuestion) throw new HttpException(409, Constants.NOT_FOUND);

    return findQuestion;
  }

  public async createQuestion(QuestionData: CreateQuestionDto): Promise<Question> {
    if (isEmpty(QuestionData)) throw new HttpException(400, Constants.EMPTY_BODY);

    const findQuestion: Question = await this.questions.findOne({ where: { question: QuestionData.question, userId: QuestionData.userId } });
    if (findQuestion) throw new HttpException(409, Constants.ALREADY_EXIST);

    const createQuestionData: Question = await this.questions.create({ ...QuestionData });
    return createQuestionData;
  }

  public async updateQuestion(QuestionId: number, QuestionData: SetQuestionDto): Promise<Question> {
    if (isEmpty(QuestionData)) throw new HttpException(400, Constants.EMPTY_BODY);

    const findQuestion: Question = await this.questions.findByPk(QuestionId);
    if (!findQuestion) throw new HttpException(409, Constants.EMPTY_ID);

    await this.questions.update({ ...QuestionData }, { where: { id: QuestionId } });

    const updateQuestion: Question = await this.questions.findByPk(QuestionId);
    return updateQuestion;
  }

  public async deleteQuestion(QuestionId: number): Promise<Question> {
    if (isEmpty(QuestionId)) throw new HttpException(400, Constants.EMPTY_ID);

    const findQuestion: Question = await this.questions.findByPk(QuestionId);
    if (!findQuestion) throw new HttpException(409, Constants.NOT_FOUND);

    await this.questions.destroy({ where: { id: QuestionId } });

    return findQuestion;
  }
}

export default QuestionService;
