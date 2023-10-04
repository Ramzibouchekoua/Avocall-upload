import React, { useState, useEffect } from 'react';
import { Input, Button, Modal } from 'antd';
import { UserOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

import 'moment/locale/ar-tn';
import Posts from '../AllPayments';

const Consultation = () => {
  const [email, setEmail] = useState('');
  const [consultation, setConsultation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setuser] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('auth-token'),
      },
    };
    axios
      .post(
        process.env.REACT_APP_API_URL + '/api/admin/updateUserConsultationsTotal',
        { email: email, consultationNumber: consultation },
        config
      )
      .then((res) => setuser(res.data.user))
      .then(setIsModalOpen(true))
      .catch((err) => alert(err));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="alluser">
      <span className="title">Add user consultation</span>
      <form onSubmit={handleSubmit}>
        <Input placeholder="User Email" prefix={<UserOutlined />} value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input
          placeholder="Consultation Number"
          prefix={<FileDoneOutlined />}
          value={consultation}
          onChange={(e) => setConsultation(e.target.value)}
        />
        <button onClick={handleSubmit}>Add Consultation</button>
      </form>
      <Modal title="Add Consultation " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {Object.keys(user).length === 0 ? (
          <b>Error</b>
        ) : (
          <>
            <b>Success</b>
            <p>Name: {user.name}</p>
            <p>Email:{user.email} </p>
            <p>Wallet: {user.wallet}</p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Consultation;
