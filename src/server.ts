process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import UsersRoute from '@routes/users.route';
import ReplyRoute from './routes/replies.route';
import QuestionsRoute from '@routes/questions.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new QuestionsRoute(), new ReplyRoute()]);

app.listen();
