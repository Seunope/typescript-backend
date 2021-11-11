import DB from '@databases';
import { CreateQuestionDto, SetQuestionDto } from '@dtos/questions.dto';
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

    const findQuestion: Question = await this.questions.findOne({ where: { question: QuestionData.question, userId: QuestionData.userId } });
    if (findQuestion) throw new HttpException(409, `You questions: " ${QuestionData.question}" already exists`);

    const createQuestionData: Question = await this.questions.create({ ...QuestionData });
    return createQuestionData;
  }
  public async updateQuestion(QuestionId: number, QuestionData: SetQuestionDto): Promise<Question> {
    if (isEmpty(QuestionData)) throw new HttpException(400, "You're not QuestionData");

    const findQuestion: Question = await this.questions.findByPk(QuestionId);
    if (!findQuestion) throw new HttpException(409, "You're not Question");

    await this.questions.update({ ...QuestionData }, { where: { id: QuestionId } });

    const updateQuestion: Question = await this.questions.findByPk(QuestionId);
    return updateQuestion;
  }

  public async deleteQuestion(QuestionId: number): Promise<Question> {
    if (isEmpty(QuestionId)) throw new HttpException(400, 'Not QuestionId');

    const findQuestion: Question = await this.questions.findByPk(QuestionId);
    if (!findQuestion) throw new HttpException(409, 'Not Question');

    await this.questions.destroy({ where: { id: QuestionId } });

    return findQuestion;
  }
}

export default QuestionService;
