import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import RatingsController from '@controllers/ratings.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateRating2Dto, UpdateRatingDto } from '@dtos/ratings.dto';

class RatingsRoute implements Routes {
  public path = '/ratings';
  public router = Router();
  public ratingsController = new RatingsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ratingsController.getRatings);
    this.router.get(`${this.path}/:id(\\d+)`, this.ratingsController.getRatingById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateRating2Dto, 'body'), this.ratingsController.createRating);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(UpdateRatingDto, 'body', true),
      this.ratingsController.updateRating,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.ratingsController.deleteRating);
  }
}

export default RatingsRoute;
