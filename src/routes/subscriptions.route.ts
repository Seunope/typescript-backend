import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import SubscriptionsController from '@controllers/subscriptions.controller';
import { CreateDataSubscriptionDto, UpdateSubscriptionDto } from '@dtos/subscriptions.dto';

class SubscriptionsRoute implements Routes {
  public path = '/subscriptions';
  public router = Router();
  public subscriptionsController = new SubscriptionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.subscriptionsController.getSubscriptions);
    this.router.get(`${this.path}/:id(\\d+)`, this.subscriptionsController.getSubscriptionById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateDataSubscriptionDto, 'body'),
      this.subscriptionsController.createSubscription,
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(UpdateSubscriptionDto, 'body', true),
      this.subscriptionsController.updateSubscription,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.subscriptionsController.deleteSubscription);
  }
}

export default SubscriptionsRoute;
