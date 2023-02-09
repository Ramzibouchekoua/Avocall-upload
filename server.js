import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import colors from 'colors';
import mongoose from 'mongoose';
import connectDB from './middlewares/db';
import { notFound, errorHandler } from './middlewares/errorMiddleware';
import config from './config';
import routes from './routes';
import Message from './models/message';
import User from './models/user';
import emptyOutUploadDir from './helpers/emptyOutUploadDir';

const morgan = require('morgan');
const app = express();

const server = require('http').createServer(app);

// db connexion
connectDB();
mongoose.connection.on('error', (err) => {
  console.log('Mongoose Connection ERROR: ' + err.message);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected!');
});
// HTTP request logger middleware
app.use(morgan('dev'));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use('*', cors());
app.options('*', cors());
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
// api routes
app.use('*', routes);

// handle error
app.use(notFound);
app.use(errorHandler);
// app.get('/', function (req, res, next) {
//   res.send('testing');
// });
const PORT = config.port || 5000;

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const jwt = require('jwt-then');

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, config.jwt.secret);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});

io.on('connection', (socket) => {
  console.log('socket: ' + socket.userId);
  socket.on('joinRoom', ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log('A user joined chatroom: ' + chatroomId);
  });

  socket.on('leaveRoom', ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log('A user left chatroom: ' + chatroomId);
  });

  socket.on('chatroomMessage', async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        name: user.name,
        message,
      });
      io.to(chatroomId).emit('newMessage', {
        message,
        name: user.name,
        user: socket.userId,
      });
      await newMessage.save();
    }
  });
  // Leave the room if the user closes the socket
  socket.on('disconnect', ({ chatroomId }) => {
    socket.leave(chatroomId);
  });
});

emptyOutUploadDir.start();

server.listen(PORT, console.log(`server running in ${config.env} on port ${PORT}`.yellow.bold));
