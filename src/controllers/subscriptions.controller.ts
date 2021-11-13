import { NextFunction, Request, Response } from 'express';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '@dtos/subscriptions.dto';
import { Subscription } from '@interfaces/subscriptions.interface';
import subscriptionService from '@services/subscriptions.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

class SubscriptionsController {
  public subscriptionService = new subscriptionService();

  public getSubscriptions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllSubscriptionsData: Subscription[] = await this.subscriptionService.findAllSubscription();

      res.status(200).json({ data: findAllSubscriptionsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSubscriptionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const SubscriptionId = Number(req.params.id);
      const findOneSubscriptionData: Subscription = await this.subscriptionService.findSubscriptionById(SubscriptionId);

      res.status(200).json({ data: findOneSubscriptionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSubscription = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      req.body.userId = req.user.id;
      const SubscriptionData: CreateSubscriptionDto = req.body;
      const createSubscriptionData: Subscription = await this.subscriptionService.createSubscription(SubscriptionData);

      res.status(201).json({ data: createSubscriptionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const SubscriptionId = Number(req.params.id);
      const SubscriptionData: UpdateSubscriptionDto = req.body;
      const updateSubscriptionData: Subscription = await this.subscriptionService.updateSubscription(SubscriptionId, SubscriptionData);

      res.status(200).json({ data: updateSubscriptionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const SubscriptionId = Number(req.params.id);
      const deleteSubscriptionData: Subscription = await this.subscriptionService.deleteSubscription(SubscriptionId);

      res.status(200).json({ data: deleteSubscriptionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SubscriptionsController;
