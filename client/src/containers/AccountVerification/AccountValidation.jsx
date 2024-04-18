import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';

const AccountValidation = () => {
  const [validationMessage, setValidationMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Call verification function if token exists
    if (token) {
      verifyToken(token);
    } else {
      history.push('/sign-up');
    }
  }, []);
  const verifyToken = async (token) => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `/api/user/verifMail/${token}`);
      setValidationMessage(response.data);
    } catch (error) {
      setValidationMessage('Failed to validate token');
    }
  };
  return (
    <>
      {validationMessage === 'Failed to validate token' ? (
        <div className="account-verification">
          <h3> لا يمكننا التحقق من حسابك، يرجى الاتصال بنا </h3>
          <h3>شكرًا لك</h3>
          <Link to="/contact"> اتصل بنا</Link>
        </div>
      ) : validationMessage ? (
        <div className="account-verification">
          <h3>تم التحقق من حسابك الآن</h3>
          <h3>شكرًا لك</h3>
          <h4>لتسجيل الدخول انقر على هذا الزر</h4>
          <Link to="/sign-in"> الدخول</Link>
        </div>
      ) : (
        <Spin tip="جاري..." />
      )}
    </>
  );
};

export default AccountValidation;
