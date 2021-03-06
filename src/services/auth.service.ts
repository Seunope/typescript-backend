import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import DB from '@databases';
import { AuthUser, CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import constants from '@/utils/constants';

class AuthService {
  public users = DB.Users;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, constants.EMPTY_BODY);

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: AuthUser): Promise<{ cookie: string; token: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, constants.EMPTY_BODY);

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `User email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const { cookie, token } = this.createCookie(tokenData);

    return { cookie, token, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not user");

    const findUser: User = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): any {
    return {
      cookie: `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`,
      token: tokenData.token,
    };
  }
}

export default AuthService;
