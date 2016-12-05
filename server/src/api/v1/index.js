import { Router } from 'express';
import { login, create, show } from './users';
import rooms from './rooms';
import auth from '../../auth';

export default ({ config }) => {
  let api = Router();

  // Public paths
  api.post('/users/login', login)
  api.post('/users', create);

  // Protected resources
  api.get('/users/:id', auth, show);
  api.use('/rooms', auth, rooms({ config }));

  return api;
}
