import jwt from 'express-jwt';

/**
 * Middleware to check if the json web tocket is valid.
 * We need to write of our own (a proxy) to ensure the dotenv config are loaded
 */
export default (req, res, next) => {
  jwt({
    secret: process.env.SECRET_HASH_PASSWORD
  })(req, res, next);
}
