import { notification } from 'antd';

const displayNotification = (type = 'info', message = '', description = '') => {
  notification[type]({
    message: message,
    description: description,
    placement: 'bottomLeft',
  });
};

export default displayNotification;
