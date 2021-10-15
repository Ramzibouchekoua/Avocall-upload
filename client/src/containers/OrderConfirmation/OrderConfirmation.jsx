import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const OrderConfirmation = () => {
  const [orderNumber, setOrderNumber] = useState();
  const [returnUrl] = useState('finish.html');
  const [currency] = useState(788);
  const [language] = useState('en');
  const [password] = useState(process.env.REACT_APP_CLICK_TO_PAY_PASSWORD);
  const [userName] = useState(process.env.REACT_APP_CLICK_TO_PAY_USERNAME);
  const [formUrl, setFormUrl] = useState('');
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
        const response = await axios.get('http://localhost:5000/api/user/createOrderNumber', {
          headers: { 'x-auth-token': token }
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
      const res = await axios.post(
        process.env.REACT_APP_CLICK_TO_PAY_API_URL +
          '?amount=' +
          query.get('amount') +
          '&currency=' +
          currency +
          '&language=' +
          language +
          '&orderNumber=' +
          orderNumber +
          '&password=' +
          password +
          '&returnUrl=' +
          returnUrl +
          '&userName=' +
          userName
      );
      console.log(res.data);
      setFormUrl(res.data.formUrl);
      //window.location.href = formUrl;
    } catch (err) {
      console.log('error in createOrderNumber', err);
    }
  };
  console.log(orderNumber);
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
