import { NextFunction, Request, Response } from 'express';
import { CreateRatingDto, UpdateUserRatingDto } from '@dtos/ratings.dto';
import { Rating } from '@interfaces/ratings.interface';
import ratingService from '@services/ratings.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class RatingsController {
  public ratingService = new ratingService();

  public getRatings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllRatingsData: Rating[] = await this.ratingService.findAllRating();

      res.status(200).json({ data: findAllRatingsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRatingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RatingId = Number(req.params.id);
      const findOneRatingData: Rating = await this.ratingService.findRatingById(RatingId);

      res.status(200).json({ data: findOneRatingData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRating = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      req.body.userId = req.user.id;
      const RatingData: CreateRatingDto = req.body;
      const createRatingData: Rating = await this.ratingService.createRating(RatingData);

      res.status(201).json({ data: createRatingData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRating = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const RatingId = Number(req.params.id);
      req.body.userId = req.user.id;
      const RatingData: UpdateUserRatingDto = req.body;
      const updateRatingData: Rating = await this.ratingService.updateRating(RatingId, RatingData);

      res.status(200).json({ data: updateRatingData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRating = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const RatingId = Number(req.params.id);
      const deleteRatingData: Rating = await this.ratingService.deleteRating(RatingId);

      res.status(200).json({ data: deleteRatingData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default RatingsController;
