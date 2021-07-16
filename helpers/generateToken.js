import jwt from 'jsonwebtoken';
import config from '../config';

const generateToken = (id, secret = config.jwt.secret) =>
  jwt.sign({ id }, secret, { expiresIn: config.jwt.accessExpirationMinutes });

export default generateToken;
