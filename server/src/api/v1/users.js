import resource from 'resource-router-middleware';
import { toRes } from '../../lib/util';
import User from '../../models/users';

export default () => resource({

  /** Property name to store preloaded entity on `request`. */
  id : 'user',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    User.findById(id, callback);
  },

  /** GET / - List all entities */
  index({ params }, res) {
    console.log('yo');
    User.find({}, toRes(res, 200));
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    const user = new User({
      name: body.name,
      username: body.username
    });

    user.setPassword(body.password);
    user.save(err => {
      if (err) {
        return toRes(res, 400)(err);
      }


      return toRes(res, 400)(err, Object.assign(user, { token: user.generateJwt() }));
    });
  },

  /** GET /:id - Return a given entity */
  read({ user }, res) {
    res.json(user);
  }
});
