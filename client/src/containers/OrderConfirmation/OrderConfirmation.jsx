import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ModalPayement from './ModalPayement';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const OrderConfirmation = () => {
  const [currency] = useState(788);
  const [language] = useState('en');
  const [password] = useState(process.env.REACT_APP_CLICK_TO_PAY_PASSWORD);
  const [userName] = useState(process.env.REACT_APP_CLICK_TO_PAY_USERNAME);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [transaction, setTransaction] = useState(null);
  const query = useQuery();
  const packCode = query.get('packCode');

  useEffect(() => {
    const createTransaction = async () => {
      if (!packCode) {
        return;
      }

      try {
        let token = localStorage.getItem('auth-token');
        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }

        const response = await axios.post(
          process.env.REACT_APP_API_URL + '/api/user/payments/card/initiate',
          { packCode },
          {
            headers: { 'x-auth-token': token },
          },
        );

        setTransaction(response.data.transaction);
      } catch (err) {}
    };

    createTransaction();
  }, [packCode]);

  useEffect(() => {
    openModel();
  }, [url]);

  const sendPayment = async () => {
    if (!transaction) {
      return;
    }

    try {
      const transactionId = transaction._id;
      const orderNumber = transaction.provider && transaction.provider.orderNumber ? transaction.provider.orderNumber : '';
      const successUrl = `${process.env.REACT_APP_CLIENT_URL}/payment-success?transactionId=${transactionId}`;
      const failUrl = `${process.env.REACT_APP_CLIENT_URL}/payment-error?transactionId=${transactionId}`;

      const {
        data: { formUrl },
      } = await axios.post(
        process.env.REACT_APP_CLICK_TO_PAY_API_URL +
          '?amount=' +
          parseFloat(transaction.expectedAmount) +
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
          `&returnUrl=${successUrl}&failUrl=${failUrl}`,
      );
      setUrl(formUrl);
    } catch (err) {}
  };

  const openModel = () => {
    if (url.length > 1) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="PayementError">
      <span>
        يرجى الضغط على زر <b>الدفع</b> لإتمام المعاملة
      </span>
      <div className="Payement">
        <button className="ant-btn" onClick={() => sendPayment()} disabled={!transaction}>
          الدفع
        </button>

        <Link to="/dashboard">
          <button className="ant-btn">العودة لقائمة الاختيارات</button>
        </Link>
      </div>
      <ModalPayement setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} url={url} />
    </div>
  );
};

export default OrderConfirmation;
