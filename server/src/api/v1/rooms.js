import { toRes } from '../../lib/util';
import Room from '../../models/rooms';
import User from '../../models/users';

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
        return User.findById(user._id)
          .then(theUser => {
            const room = new Room({
              name: body.name,
              admin: theUser,
              users: [theUser]
            });

            return room.save(toRes(res, 201));
          });
      }

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
export const show = ({ user, params}, res) => Room.findById(params.id, toRes(res, 200));

/**
 * Joins a room
 * @param  {Object} options.user
 * @param  {Object} options.params
 * @param  {Object} res
 */
export const join = ({ user, params }, res) => {
  Room.findById(params.id)
    .then(room => {
      if (!room) {
        return res.status(404).send({ error: 'This room does not exist.' });
      }

      // Check if the user is already in the users list
      if (!room.users.find(u => u._id === user._id)) {
        return User.findById(user._id)
          .then(theUser => {
            room.users.push(theUser, toRes(res, 200));

            return room.save(toRes(res, 200));
          });
      }

      res.status(200).json(room.toObject());
    })
    .catch(toRes(res, 400));
}

/**
 * List all the rooms the user is in
 * @param  {Object} options.user
 * @param  {Object} res
 */
export const list = ({ user }, res) => Room.find({}, toRes(res, 200));
