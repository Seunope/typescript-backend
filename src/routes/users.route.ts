import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import UsersController from '@controllers/users.controller';
import { UpdateUserDto } from '@dtos/users.dto';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
    // this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, authMiddleware, validationMiddleware(UpdateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, authMiddleware, this.usersController.deleteUser);
  }
}

export default UsersRoute;
