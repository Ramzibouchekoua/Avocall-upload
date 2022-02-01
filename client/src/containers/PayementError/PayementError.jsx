import React, { useEffect } from 'react';
import { Result, Button } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PayementError = () => {
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    window.history.replaceState(null, 'Payement Error', location.pathname);

    const addPack = async () => {
      try {
        let token = localStorage.getItem('auth-token');
        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }
        const newConsultation = await axios.post(
          'https://api.avocall.com/api/user/buyPack',
          {
            consultationNumber: Number(query.get('amount') === '29000' ? 0 : 0),
            filename: 'online-payment'
          },
          {
            headers: { 'x-auth-token': token }
          }
        );
      } catch (err) {
        console.log('error in addPack', err);
      }
    };
    addPack();
  }, []);

  return (
    <Result
      status="error"
      title="حاول مرة اخرى"
      subTitle={
        <div className="PayementError">
          <span>للاسف لقد فشلت عملية الدفع حاول مرة اخرى من فضلك </span>
          <span>سوف يتصل بكم فريقنا الفني باقرب وقت ممكن</span>
        </div>
      }
    />
  );
};

export default PayementError;
