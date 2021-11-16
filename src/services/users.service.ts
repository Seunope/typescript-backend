import bcrypt from 'bcrypt';
import DB from '@databases';
import { isEmpty } from '@utils/util';
import { User } from '@interfaces/users.interface';
import { HttpException } from '@exceptions/HttpException';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import constants from '@/utils/constants';

class UserService {
  public users = DB.Users;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.users.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, constants.EMPTY_ID);

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, constants.NOT_FOUND);

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, constants.EMPTY_BODY);

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `Your  email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userReqId: number, userId: number, userData: UpdateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, constants.EMPTY_ID);

    if (userReqId !== userId) {
      throw new HttpException(402, "Action aborted! You're not the owner of this account");
    }

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, constants.NOT_FOUND);

    await this.users.update({ ...userData }, { where: { id: userId } });

    const updateUser: User = await this.users.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userReqId: number, userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, constants.EMPTY_ID);

    if (userReqId !== userId) {
      throw new HttpException(402, 'Action failed! You are not the owner of this account');
    }

    const findUser: User = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, constants.NOT_FOUND);

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
