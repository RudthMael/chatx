import { Router } from 'express';
import users, { login } from './users';
import rooms from './rooms';

export default ({ config }) => {
  let api = Router();

  api.use('/users', users({ config }));
  api.use('/users/login', login)

  api.use('/rooms', rooms({ config }));

  return api;
}
