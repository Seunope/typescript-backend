import { Sequelize } from 'sequelize';
import request from 'supertest';
import App from '@/app';
import { CreateRating2Dto, UpdateRatingDto } from '@dtos/ratings.dto';
import RatingRoute from '@routes/ratings.route';
import { config } from 'dotenv';

config();

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Ratings', () => {
  describe('[GET] /ratings', () => {
    it('response findAll ratings', async () => {
      const ratingsRoute = new RatingRoute();
      const ratings = ratingsRoute.ratingsController.ratingService.ratings;

      ratings.findAll = jest.fn().mockReturnValue([
        {
          id: 1,
          userId: 1,
          vote: 'up',
          modelId: 1,
        },
        {
          id: 2,
          userId: 1,
          vote: 'up',
          modelId: 1,
        },
        {
          id: 3,
          userId: 1,
          vote: 'up',
          modelId: 1,
        },
      ]);

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([ratingsRoute]);
      return request(app.getServer()).get(`${ratingsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /ratings/:id', () => {
    it('response findOne rating', async () => {
      const ratingId = 1;

      const ratingsRoute = new RatingRoute();
      const ratings = ratingsRoute.ratingsController.ratingService.ratings;

      ratings.findByPk = jest.fn().mockReturnValue({
        id: 1,
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([ratingsRoute]);
      return request(app.getServer()).get(`${ratingsRoute.path}/${ratingId}`).expect(200);
    });
  });

  describe('[POST] /ratings', () => {
    it('response Create rating', async () => {
      const ratingData: CreateRating2Dto = {
        vote: 'up',
        modelId: 1,
        type: 'question',
      };

      const ratingsRoute = new RatingRoute();
      const ratings = ratingsRoute.ratingsController.ratingService.ratings;

      ratings.findOne = jest.fn().mockReturnValue(null);
      ratings.create = jest.fn().mockReturnValue({
        id: 1,
        userId: 1,
        upVote: 0,
        modelId: 1,
        downVote: 0,
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([ratingsRoute]);
      return request(app.getServer())
        .post(`${ratingsRoute.path}`)
        .send(ratingData)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .expect(201);
    });
  });

  describe('[PUT] /ratings/:id', () => {
    it('response Update rating', async () => {
      const ratingId = 1;
      const ratingData: UpdateRatingDto = {
        vote: 'down',
      };

      const ratingsRoute = new RatingRoute();
      const ratings = ratingsRoute.ratingsController.ratingService.ratings;

      ratings.findByPk = jest.fn().mockReturnValue({
        id: ratingId,
        userId: 1,
        upVote: 0,
        modelId: 1,
        downVote: 0,
      });
      ratings.update = jest.fn().mockReturnValue([1]);
      ratings.findByPk = jest.fn().mockReturnValue({
        id: ratingId,
        userId: 1,
        upVote: 0,
        modelId: 1,
        downVote: 0,
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([ratingsRoute]);
      return request(app.getServer())
        .put(`${ratingsRoute.path}/${ratingId}`)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(ratingData)
        .expect(200);
    });
  });

  describe('[DELETE] /ratings/:id', () => {
    it('response Delete rating', async () => {
      const ratingId = 1;

      const ratingsRoute = new RatingRoute();
      const ratings = ratingsRoute.ratingsController.ratingService.ratings;

      ratings.findByPk = jest.fn().mockReturnValue({
        id: ratingId,
        upVote: false,
        downVote: false,
        modelId: 1,
        type: 'question',
      });

      (Sequelize as any).authenticate = jest.fn();
      const app = new App([ratingsRoute]);
      return request(app.getServer()).delete(`${ratingsRoute.path}/${ratingId}`).set('Authorization', `Bearer ${process.env.TEST_TOKEN}`).expect(200);
    });
  });
});
