import { notification } from 'antd';

const displayNotification = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
    placement: 'bottomLeft',
  });
};

export default displayNotification;
