import { toRes } from '../../lib/util';
import Room from '../../models/rooms';

/**
 * Creates the new room
 * @param  {Object} options.body
 * @param  {Object} options.user logged user
 * @param  {Object} res
 */
export const create = ({ body, user }, res) => {
  Room.findOne({ name: body.name })
    .then(room => {
      if (!room) {
        console.log(`Room "${body.name}" not found, creating room with admin "${user.name}(${user._id})`);

        const room = new Room({
          name: body.name,
          admin: user._id,
          users: [user._id]
        });

        console.log("Room:", room);

        return room.save((err, item) => {
          if (err) {
            return toRes(res, 201)(err, item);
          }

          room.populate('admin users', toRes(res, 201));
        });
      }

      console.log(`Room "${room.name} already exists.`);
      return res.status(200).json(room);
    })
    .catch(toRes(res, 400))
};

/**
 * Shows a given room
 * @param  {Object} options.user   logged user
 * @param  {Object} options.params
 * @param  {Object} res
 */
export const show = ({ user, params}, res) => {
  Room.findById(params.id).populate('admin users').exec(toRes(res, 200));
};

/**
 * Joins a room
 * @param  {Object} options.user
 * @param  {Object} options.params
 * @param  {Object} res
 */
export const join = ({ user, params }, res) => {
  Room.findById(params.id)
    .populate('admin users')
    .then(room => {
      if (!room) {
        return res.status(404).send({ error: 'This room does not exist.' });
      }

      console.log(`"${user.name}" is about to join the room "${room.name}"`);

      // Check if the user is already in the users list
      if (room.users.findIndex(userId => userId.equals(user._id)) < 0) {
        console.log(`"Adding ${user.name}" to the room "${room.name}"`);

        room.users.push(user);
        console.log(`"${user.name}" added to the room "${room.name}"`);

        return room.save((err, item) => {
          if (err) {
            return toRes(res, 200)(err, item);
          }

          room.populate('admin users', toRes(res, 200));
        });
      }

      console.log(`"${user.name}" is already in the room "${room.name}"`);

      res.status(200).json(room.toObject());
    })
    .catch(error => {
      console.error('Error when joining room:', error);
      toRes(res, 400)
    });
}

/**
 * List all the rooms the user is in
 * @param  {Object} options.user
 * @param  {Object} res
 */
export const list = ({ user, query }, res) => {
  const filter = {};

  if (query.name) {
    filter.name = query.name;
  }

  Room.find(filter)
    .populate('admin users')
    .where({ 'users': user._id })
    .exec(toRes(res, 200));
};
