process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import UsersRoute from '@routes/users.route';
import RatingRoute from '@routes/ratings.route';
import ReplyRoute from './routes/replies.route';
import QuestionsRoute from '@routes/questions.route';
import NotificationsRoute from './routes/notifications.route';
import SubscriptionsRoute from '@routes/subscriptions.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new ReplyRoute(),
  new UsersRoute(),
  new RatingRoute(),
  new QuestionsRoute(),
  new SubscriptionsRoute(),
  new NotificationsRoute(),
]);

app.listen();
