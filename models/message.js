import mongoose from 'mongoose';
let ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: ObjectId,
    required: 'Chatroom is required!',
    ref: 'consultation',
  },
  user: {
    type: ObjectId,
    required: 'Chatroom is required!',
    ref: 'user',
  },
  name: {
    type: String,
  },
  message: {
    type: String,
    required: 'Message is required!',
  },
});

const Message = mongoose.model('message', messageSchema);
export default Message;
