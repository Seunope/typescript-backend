import { NextFunction, Request, Response } from 'express';
import { CreateQuestionDto } from '@dtos/questions.dto';
import { Question } from '@interfaces/questions.interface';
import questionService from '@services/questions.service';

class QuestionsController {
  public questionService = new questionService();

  public getQuestions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllQuestionsData: Question[] = await this.questionService.findAllQuestion();

      res.status(200).json({ data: findAllQuestionsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getQuestionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const QuestionId = Number(req.params.id);
      const findOneQuestionData: Question = await this.questionService.findQuestionById(QuestionId);

      res.status(200).json({ data: findOneQuestionData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('ree',req.cookies);
      const QuestionData: CreateQuestionDto = req.body;
      const createQuestionData: Question = await this.questionService.createQuestion(QuestionData);

      res.status(201).json({ data: createQuestionData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const QuestionId = Number(req.params.id);
      const QuestionData: CreateQuestionDto = req.body;
      const updateQuestionData: Question = await this.questionService.updateQuestion(QuestionId, QuestionData);

      res.status(200).json({ data: updateQuestionData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const QuestionId = Number(req.params.id);
      const deleteQuestionData: Question = await this.questionService.deleteQuestion(QuestionId);

      res.status(200).json({ data: deleteQuestionData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default QuestionsController;
