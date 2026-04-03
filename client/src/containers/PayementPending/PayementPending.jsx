import React, { useEffect, useState } from 'react';
import { Result } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PayementPending = () => {
  const query = useQuery();
  const [status, setStatus] = useState('PENDING_REVIEW');
  const transactionId = query.get('transactionId');

  useEffect(() => {
    if (!transactionId) {
      return;
    }

    const loadTransaction = async () => {
      try {
        let token = localStorage.getItem('auth-token');

        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }

        const response = await axios.get(process.env.REACT_APP_API_URL + '/api/user/payments/' + transactionId, {
          headers: { 'x-auth-token': token },
        });

        setStatus(response.data.transaction.status);
      } catch (err) {}
    };

    loadTransaction();
  }, [transactionId]);

  const subtitle =
    status === 'APPROVED'
      ? 'تمت الموافقة على الدفعة وإضافة الرصيد إلى حسابك.'
      : 'تم استلام الطلب وسيتم التثبت منه ثم إضافة الرصيد بعد المراجعة.';

  return (
    <Result
      status="info"
      title="تم استلام الطلب"
      subTitle={
        <div className="PayementPending">
          <span>{subtitle}</span>
          <br />
          <Link to="/dashboard">العودة إلى الحساب</Link>
        </div>
      }
    />
  );
};

export default PayementPending;
