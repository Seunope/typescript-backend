import DB from '@databases';
import { isEmpty } from '@utils/util';
import { CreateRatingDto } from '@dtos/ratings.dto';
import { Rating } from '@interfaces/ratings.interface';
import { HttpException } from '@exceptions/HttpException';
import { Question } from '@/interfaces/questions.interface';
import { Reply } from '@/interfaces/answers.interface';
import constants from '@/utils/constants';

class RatingService {
  public ratings = DB.Ratings;
  public questions = DB.Questions;
  public answers = DB.Answers;

  public async findAllRating(): Promise<Rating[]> {
    const allRating: Rating[] = await this.ratings.findAll();
    return allRating;
  }

  public async findRatingById(RatingId: number): Promise<Rating> {
    if (isEmpty(RatingId)) throw new HttpException(400, constants.EMPTY_ID);

    const findRating: Rating = await this.ratings.findByPk(RatingId);
    if (!findRating) throw new HttpException(409, constants.NOT_FOUND);

    return findRating;
  }

  public async createRating(RatingData: CreateRatingDto): Promise<Rating> {
    if (isEmpty(RatingData)) throw new HttpException(400, constants.EMPTY_BODY);

    const upVote = RatingData.vote === 'up' ? true : false;
    const downVote = RatingData.vote === 'down' ? true : false;

    if (RatingData.type === 'question') {
      const findQuestion: Question = await this.questions.findOne({ where: { id: RatingData.modelId } });
      if (!findQuestion) throw new HttpException(409, `Question does not exist`);
      // compute vote
      const disQVote = {
        upVote: upVote ? Number(findQuestion.upVote + 1) : findQuestion.upVote,
        downVote: downVote ? Number(findQuestion.downVote + 1) : findQuestion.downVote,
      };
      await this.questions.update({ ...RatingData, ...disQVote }, { where: { id: RatingData.modelId } });
    } else {
      //reply
      const findReply: Reply = await this.answers.findOne({ where: { id: RatingData.modelId } });
      if (!findReply) throw new HttpException(409, `Reply does not exist`);
      // compute vote
      const disRVote = {
        upVote: upVote ? Number(findReply.upVote + 1) : findReply.upVote,
        downVote: downVote ? Number(findReply.downVote + 1) : findReply.downVote,
      };
      await this.answers.update({ ...RatingData, ...disRVote }, { where: { id: RatingData.modelId } });
    }

    const findRating: Rating = await this.ratings.findOne({
      where: { userId: RatingData.userId, modelId: RatingData.modelId, type: RatingData.type },
    });
    if (findRating) throw new HttpException(409, 'You have already rated');

    const createRatingData: Rating = await this.ratings.create({ ...RatingData, downVote, upVote });
    return createRatingData;
  }
  public async updateRating(RatingId: number, RatingData: CreateRatingDto): Promise<Rating> {
    if (isEmpty(RatingData)) throw new HttpException(400, constants.EMPTY_ID);

    const upVote = RatingData.vote === 'up' ? true : false;
    const downVote = RatingData.vote === 'down' ? true : false;

    const findRating: Rating = await this.ratings.findByPk(RatingId);
    if (!findRating) throw new HttpException(409, 'Action failed');

    //check if user created the vote
    if (findRating.userId !== RatingData.userId) throw new HttpException(409, 'This votes does not belong to you. Action failed!');

    if (findRating.type === 'question') {
      const findQuestion: Question = await this.questions.findOne({ where: { id: RatingData.modelId } });
      if (!findQuestion) throw new HttpException(409, `Question does not exist`);

      const disQVote = { upVote: 0, downVote: 0 };
      if (upVote) {
        disQVote.upVote = Number(findQuestion.upVote + 1);
        disQVote.downVote = Number(findQuestion.downVote - 1);
      } else {
        disQVote.upVote = Number(findQuestion.upVote - 1);
        disQVote.downVote = Number(findQuestion.downVote + 1);
      }
      await this.questions.update({ ...RatingData, ...disQVote }, { where: { id: RatingData.modelId } });
    } else {
      {
        const findReply: Reply = await this.answers.findOne({ where: { id: RatingData.modelId } });
        if (!findReply) throw new HttpException(409, `Reply does not exist`);

        const disRVote = { upVote: 0, downVote: 0 };
        if (upVote) {
          disRVote.upVote = Number(findReply.upVote + 1);
          disRVote.downVote = Number(findReply.downVote - 1);
        } else {
          disRVote.upVote = Number(findReply.upVote - 1);
          disRVote.downVote = Number(findReply.downVote + 1);
        }
        await this.answers.update({ ...RatingData, ...disRVote }, { where: { id: RatingData.modelId } });
      }
    }

    //update ratings table
    await this.ratings.update({ ...RatingData, downVote, upVote }, { where: { id: RatingId } });

    const updateRating: Rating = await this.ratings.findByPk(RatingId);
    return updateRating;
  }

  public async deleteRating(RatingId: number): Promise<Rating> {
    if (isEmpty(RatingId)) throw new HttpException(400, constants.EMPTY_ID);

    const findRating: Rating = await this.ratings.findByPk(RatingId);
    if (!findRating) throw new HttpException(409, constants.NOT_FOUND);

    await this.ratings.destroy({ where: { id: RatingId } });

    return findRating;
  }
}

export default RatingService;
