import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

/**
 * Sets the password to the user
 * @param  {Strign} password
 */
UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/**
 * Returns true if the password matches the one stored in database
 * @param  {String} password
 * @return {Boolean}
 */
UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

/**
 * Generates a json web token to communicate with the API
 * @return {String}
 */
UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.SECRET_HASH_PASSWORD);
};

/**
 * Returns the Json object of the user
 * @return {Object}
 */
UserSchema.methods.toObject = function() {
  return {
    _id: this._id,
    username: this.username,
    name: this.name
  };
};

export { UserSchema };
export default mongoose.model('User', UserSchema);

// export default db => ({

//   /**
//    * Lists the users in the database
//    * @param  {Function} callback
//    */
//   list(callback) {
//     db.collection(USERS_COLLECTION).find({}).toArray(callback);
//   },

//   /**
//    * Gets the user with the given id
//    * @param  {String} id
//    * @param {Function} callback
//    */
//   get(id, callback) {
//     db.collection(USERS_COLLECTION).findOne({ _id: ObjectID(id) }, callback);
//   },

//   /**
//    * Creates and saves a new user in the database
//    * @param  {Object}   attributes
//    * @param  {Function} callback
//    */
//   create(attributes, callback) {
//     db.collection(USERS_COLLECTION).insertOne(attributes, (err, doc) => {
//       if (err) {
//         return callback(err);
//       }

//       callback(null, doc.ops[0]);
//     });
//   },

//   /**
//    * Updates the user with the given ID
//    * @param  {String}   id
//    * @param  {Object}   attributes - attributes for the new user
//    * @param  {Function} callback
//    */
//   update(id, attributes, callback) {
//     db.collection(USERS_COLLECTION).updateOne({ _id: ObjectID(id) }, attributes, err => {
//       if (err) {
//         return callback(err);
//       }

//       // Mongodb wont return the full object :\
//       return this.get(id, callback);
//     });
//   }
// });
