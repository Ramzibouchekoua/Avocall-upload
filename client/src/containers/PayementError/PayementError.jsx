import React, { useEffect } from 'react';
import { Result } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PayementError = () => {
  const location = useLocation();
  const query = useQuery();
  const transactionId = query.get('transactionId');

  useEffect(() => {
    window.history.replaceState(null, 'Payement Error', location.pathname);

    const syncTransaction = async () => {
      try {
        let token = localStorage.getItem('auth-token');
        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }

        if (!transactionId) {
          return;
        }

        await axios.post(
          process.env.REACT_APP_API_URL + '/api/user/payments/card/return',
          {
            transactionId,
            outcome: 'failed',
          },
          {
            headers: { 'x-auth-token': token },
          },
        );
      } catch (err) {}
    };

    syncTransaction();
  }, [location.pathname, transactionId]);

  return (
    <Result
      status="error"
      title="حاول مرة اخرى"
      subTitle={
        <div className="PayementError">
          <span>للاسف لقد فشلت عملية الدفع حاول مرة اخرى من فضلك </span>
          <span>سوف يتصل بكم فريقنا الفني باقرب وقت ممكن</span>
          <br />
          <Link to="/checkout">العودة إلى صفحة الدفع</Link>
        </div>
      }
    />
  );
};

export default PayementError;
