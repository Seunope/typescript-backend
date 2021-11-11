import DB from '@databases';
import { CreateRatingDto } from '@dtos/ratings.dto';
import { HttpException } from '@exceptions/HttpException';
import { Rating } from '@interfaces/ratings.interface';
import { isEmpty } from '@utils/util';

class RatingService {
  public ratings = DB.Ratings;

  public async findAllRating(): Promise<Rating[]> {
    const allRating: Rating[] = await this.ratings.findAll();
    return allRating;
  }

  public async findRatingById(RatingId: number): Promise<Rating> {
    if (isEmpty(RatingId)) throw new HttpException(400, "You're not RatingId");

    const findRating: Rating = await this.ratings.findByPk(RatingId);
    if (!findRating) throw new HttpException(409, "You're not Rating");

    return findRating;
  }

  public async createRating(RatingData: CreateRatingDto): Promise<Rating> {
    if (isEmpty(RatingData)) throw new HttpException(400, "You're not RatingData");

    const findRating: Rating = await this.ratings.findOne({
      where: { userId: RatingData.userId, modelId: RatingData.modelId, type: RatingData.type },
    });
    if (findRating) throw new HttpException(409, `You're ratings is created`);

    const createRatingData: Rating = await this.ratings.create({ ...RatingData });
    return createRatingData;
  }
  public async updateRating(RatingId: number, RatingData: CreateRatingDto): Promise<Rating> {
    if (isEmpty(RatingData)) throw new HttpException(400, "You're not RatingData");

    const findRating: Rating = await this.ratings.findByPk(RatingId);
    if (!findRating) throw new HttpException(409, "You're not Rating");

    await this.ratings.update({ ...RatingData }, { where: { id: RatingId } });

    const updateRating: Rating = await this.ratings.findByPk(RatingId);
    return updateRating;
  }

  public async deleteRating(RatingId: number): Promise<Rating> {
    if (isEmpty(RatingId)) throw new HttpException(400, "You're not RatingId");

    const findRating: Rating = await this.ratings.findByPk(RatingId);
    if (!findRating) throw new HttpException(409, "You're not Rating");

    await this.ratings.destroy({ where: { id: RatingId } });

    return findRating;
  }
}

export default RatingService;
