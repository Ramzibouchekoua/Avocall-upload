import Message from '../models/message';

export const getAllMessages = async (req, res) => {
  const { chatroom } = req.params;
  const messages = await Message.find({ chatroom }).populate('chatroom');
  res.json(messages);
};
