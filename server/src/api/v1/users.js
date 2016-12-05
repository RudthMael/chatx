import resource from 'resource-router-middleware';
import { toRes } from '../../lib/util';
import User from '../../models/users';

export default ({ db }) => resource({

  /** Property name to store preloaded entity on `request`. */
  id : 'user',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    User(db).get(id, callback);
  },

  /** GET / - List all entities */
  index({ params }, res) {
    User(db).list(toRes(res, 200));
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    User(db).create(body, toRes(res, 201));
  },

  /** GET /:id - Return a given entity */
  read({ user }, res) {
    res.json(user);
  },

  /** PUT /:id - Update a given entity */
  update({ user, body }, res) {
    User(db).update(user._id, body, toRes(res, 200));
  }

});
