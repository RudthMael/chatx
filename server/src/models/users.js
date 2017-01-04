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
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

/**
 * Sets the password to the user
 * @param  {Strign} password
 */
UserSchema.method('setPassword', function(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64).toString('hex');

  this.salt = salt;
  this.hash = hash;
});

/**
 * Returns true if the password matches the one stored in database
 * @param  {String} password
 * @return {Boolean}
 */
UserSchema.method('validPassword', function validPassword(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
});

/**
 * Generates a json web token to communicate with the API
 * @return {String}
 */
UserSchema.method('generateJwt', function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.SECRET_HASH_PASSWORD);
});

export { UserSchema };
export default mongoose.model('User', UserSchema);

