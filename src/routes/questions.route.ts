import { Router } from 'express';
import QuestionsController from '@controllers/questions.controller';
import { CreateQuestionDto } from '@dtos/questions.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class QuestionsRoute implements Routes {
  public path = '/questions';
  public router = Router();
  public questionsController = new QuestionsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.questionsController.getQuestions);
    this.router.get(`${this.path}/:id(\\d+)`, this.questionsController.getQuestionById);
    this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateQuestionDto, 'body'), this.questionsController.createQuestion);
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(CreateQuestionDto, 'body', true),
      this.questionsController.updateQuestion,
    );
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.questionsController.deleteQuestion);
  }
}

export default QuestionsRoute;
