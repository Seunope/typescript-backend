import bcrypt from 'bcrypt';
import DB from '@databases';
import { CreateQuestionDto } from '@dtos/questions.dto';
import { HttpException } from '@exceptions/HttpException';
import { Question } from '@interfaces/questions.interface';
import { isEmpty } from '@utils/util';

class QuestionService {
  public questions = DB.Questions;

  public async findAllQuestion(): Promise<Question[]> {
    const allQuestion: Question[] = await this.questions.findAll();
    return allQuestion;
  }

  public async findQuestionById(QuestionId: number): Promise<Question> {
    if (isEmpty(QuestionId)) throw new HttpException(400, "You're not QuestionId");

    const findQuestion: Question = await this.questions.findByPk(QuestionId);
    if (!findQuestion) throw new HttpException(409, "You're not Question");

    return findQuestion;
  }

  public async createQuestion(QuestionData: CreateQuestionDto): Promise<Question> {
    if (isEmpty(QuestionData)) throw new HttpException(400, "You're not QuestionData");

    const findQuestion: Question = await this.questions.findOne({ where: { email: QuestionData.email } });
    if (findQuestion) throw new HttpException(409, `You're email ${QuestionData.email} already exists`);

    const hashedPassword = await bcrypt.hash(QuestionData.password, 10);
    const createQuestionData: Question = await this.questions.create({ ...QuestionData, password: hashedPassword });
    return createQuestionData;
  }
  public async updateQuestion(QuestionId: number, QuestionData: CreateQuestionDto): Promise<Question> {
    if (isEmpty(QuestionData)) throw new HttpException(400, "You're not QuestionData");

    const findQuestion: Question = await this.questions.findByPk(QuestionId);
    if (!findQuestion) throw new HttpException(409, "You're not Question");

    const hashedPassword = await bcrypt.hash(QuestionData.password, 10);
    await this.questions.update({ ...QuestionData, password: hashedPassword }, { where: { id: QuestionId } });

    const updateQuestion: Question = await this.questions.findByPk(QuestionId);
    return updateQuestion;
  }

  public async deleteQuestion(QuestionId: number): Promise<Question> {
    if (isEmpty(QuestionId)) throw new HttpException(400, "You're not QuestionId");

    const findQuestion: Question = await this.questions.findByPk(QuestionId);
    if (!findQuestion) throw new HttpException(409, "You're not Question");

    await this.questions.destroy({ where: { id: QuestionId } });

    return findQuestion;
  }
}

export default QuestionService;
