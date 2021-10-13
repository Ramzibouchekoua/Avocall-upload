import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

const generateToken = async (id, secret = config.jwt.secret) => {
  const { role } = await User.findById({ _id: id });
  return jwt.sign({ id, role }, secret, { expiresIn: config.jwt.accessExpirationMinutes });
};

export default generateToken;
