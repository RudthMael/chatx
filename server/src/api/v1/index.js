import { Router } from 'express';
import users from './users';

export default ({ config }) => {
  let api = Router();

  api.use('/users', users({ config, db }));

  return api;
}
