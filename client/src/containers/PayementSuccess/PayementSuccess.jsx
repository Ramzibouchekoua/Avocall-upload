import React, { useEffect } from 'react';
import { Result } from 'antd';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PayementSuccess = () => {
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    window.history.replaceState(null, 'Payement Success', location.pathname);

    const addPack = async () => {
      try {
        let token = localStorage.getItem('auth-token');
        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }
        const amount = Number(query.get('amount'));
        await axios.post(
          process.env.REACT_APP_API_URL + '/api/user/buyPack',
          {
            amount,
            filename: 'online-payment',
          },
          {
            headers: { 'x-auth-token': token },
          }
        );
      } catch (err) {}
    };
    addPack();
  }, []);
  return (
    <Result
      status="success"
      title="Great!"
      subTitle={
        <div className="PayementSuccess">
          <span>نجح الدفع</span>
        </div>
      }
    />
  );
};

export default PayementSuccess;
