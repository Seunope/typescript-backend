import config from 'config';
import Sequelize from 'sequelize';
import { logger } from '@utils/logger';
import UserModel from '@models/users.model';
import RatingModel from '@models/ratings.model';
import ReplyModel from '@models/replies.model';
import { dbConfig } from '@interfaces/db.interface';
import QuestionModel from '@models/questions.model';

const { host, user, password, database, pool }: dbConfig = config.get('dbConfig');
const sequelize = new Sequelize.Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    //underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: pool.min,
    max: pool.max,
  },
  logQueryParameters: process.env.NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  Ratings: RatingModel(sequelize),
  Replies: ReplyModel(sequelize),
  Questions: QuestionModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
