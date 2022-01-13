import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined , FileDoneOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

import 'moment/locale/ar-tn';
import Posts from './Consultation';

const Consultation = () => {
  const [email, setEmail] = useState('');
  const [consultation, setConsultation] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('auth-token'),
      },
    };
    axios
      .post(
        'http://localhost:5000/api/admin/updateUserConsultationsTotal',
        { email: email, consultationNumber: consultation },
        config
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <div className="alluser">
    <span className='title'>Add user consultation</span>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="User Email"
          prefix={<UserOutlined />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Consultation Number"
          prefix={<FileDoneOutlined />}
          value={consultation}
          onChange={(e) => setConsultation(e.target.value)}
        />
        <button  onClick={handleSubmit}>Add Consultation</button>
      </form>
    </div>
  );
};

export default Consultation;
