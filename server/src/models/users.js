import { ObjectID } from 'mongodb';

const USERS_COLLECTION = 'users';

export default db => ({

  /**
   * Lists the users in the database
   * @param  {Function} callback
   */
  list(callback) {
    db.collection(USERS_COLLECTION).find({}).toArray(callback);
  },

  /**
   * Gets the user with the given id
   * @param  {String} id
   * @param {Function} callback
   */
  get(id, callback) {
    db.collection(USERS_COLLECTION).findOne({ _id: ObjectID(id) }, callback);
  },

  /**
   * Creates and saves a new user in the database
   * @param  {Object}   attributes
   * @param  {Function} callback
   */
  create(attributes, callback) {
    db.collection(USERS_COLLECTION).insertOne(attributes, (err, doc) => {
      if (err) {
        return callback(err);
      }

      callback(null, doc.ops[0]);
    });
  },

  /**
   * Updates the user with the given ID
   * @param  {String}   id
   * @param  {Object}   attributes - attributes for the new user
   * @param  {Function} callback
   */
  update(id, attributes, callback) {
    db.collection(USERS_COLLECTION).updateOne({ _id: ObjectID(id) }, attributes, err => {
      if (err) {
        return callback(err);
      }

      // Mongodb wont return the full object :\
      return this.get(id, callback);
    });
  }
});
