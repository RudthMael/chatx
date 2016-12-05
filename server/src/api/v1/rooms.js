import resource from 'resource-router-middleware';
import { toRes } from '../../lib/util';
import Room from '../../models/rooms';

export default () => resource({
  /** Property name to store preloaded entity on `request`. */
  id : 'room',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    Room.findById(id, callback);
  },

  /** GET /:id - Return a given entity */
  read({ user }, res) {
    res.json(user);
  },

  /** POST / - Create a new entity */
  create({ body }, res) {
    Room.findOne({ name: body.name })
      .then(room => {
        if (!room) {
          const room = new Room({
            name: body.name
          });

          return room.save(toRes(res, 200));
        }

        return toRes(res, 200)(null, room);
      })
      .catch(toRes(res, 400));
  },
});
