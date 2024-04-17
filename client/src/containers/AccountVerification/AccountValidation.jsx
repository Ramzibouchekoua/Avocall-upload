import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom';

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
      const response = await axios.get(`https://api.avocall.com/api/user/verifMail/${token}`);
      setValidationMessage(response.data.message);
    } catch (error) {
      setValidationMessage('Failed to validate token');
    }
  };
  return (
    <div className="account-verification">
      <h3>تم التحقق من حسابك الآن</h3>
      <h3>شكرًا لك</h3>
      <h4>لتسجيل الدخول انقر على هذا الزر</h4>
      <Link to="/sign-in"> الدخول</Link>
    </div>
  );
};

export default AccountValidation;
