import React, { useEffect } from 'react';
import PayementError from './PayementError';
import axios from 'axios';

const PayementFailed = props => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let link = params.get('link');
    console.log(link);
    const createOrderNumber = async () => {
      try {
        let token = localStorage.getItem('auth-token');
        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }
        const newConsultation = await axios.post(
          process.env.REACT_APP_CLICK_TO_PAY_API_URL + '/api/user/buyPack',
          {
            consultationNumber: 3,
            filename: 'online-payment'
          },
          {
            headers: { 'x-auth-token': token }
          }
        );
      } catch (err) {
        console.log('error in createOrderNumber', err);
      }
    };
    createOrderNumber();
  }, []);

  return <PayementFailed {...props} />;
};

export default PayementError;
