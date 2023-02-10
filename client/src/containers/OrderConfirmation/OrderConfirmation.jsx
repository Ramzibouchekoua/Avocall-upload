import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const OrderConfirmation = () => {
  const [orderNumber, setOrderNumber] = useState();
  const [currency] = useState(788);
  const [language] = useState('en');
  const [password] = useState(process.env.REACT_APP_CLICK_TO_PAY_PASSWORD);
  const [userName] = useState(process.env.REACT_APP_CLICK_TO_PAY_USERNAME);
  const history = useHistory();
  let query = useQuery();

  useEffect(() => {
    const createOrderNumber = async () => {
      try {
        let token = localStorage.getItem('auth-token');
        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }
        const response = await axios.get(process.env.REACT_APP_API_URL + '/api/user/createOrderNumber', {
          headers: { 'x-auth-token': token },
        });
        setOrderNumber(response.data.orderNumber);
      } catch (err) {
        console.log('error in createOrderNumber', err);
      }
    };
    createOrderNumber();
  }, []);

  const sendPayment = async () => {
    try {
      const {
        data: { orderId, formUrl },
      } = await axios.post(
        process.env.REACT_APP_CLICK_TO_PAY_API_URL +
          '?amount=' +
          parseFloat(query.get('amount')) +
          '&currency=' +
          currency +
          '&language=' +
          language +
          '&orderNumber=' +
          orderNumber +
          '&password=' +
          password +
          '&userName=' +
          userName +
          `&returnUrl=${process.env.REACT_APP_CLIENT_URL}/payment-success?amount=${query.get('amount')}&failUrl=${
            process.env.REACT_APP_CLIENT_URL
          }/payment-error?amount=${query.get('amount')}`
      );
      //console.log(formUrl);
      history.push(`/payment-gateway?orderId=${orderId}&amount=${query.get('amount')}`);
    } catch (err) {
      console.log('error in createOrderNumber', err);
    }
  };
  return (
    <div className="PayementError">
      <span>
        يرجى الضغط على زر <b>الدفع</b> لإتمام المعاملة
      </span>
      <div className="Payement">
        <button className="ant-btn" onClick={() => sendPayment()}>
          الدفع
        </button>

        <Link to="/dashboard">
          <button className="ant-btn">العودة لقائمة الاختيارات</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
