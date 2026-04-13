import React, { useContext, useEffect } from 'react';
import { Result } from 'antd';
import { CheckCircleTwoTone, ClockCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/userContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PayementSuccess = () => {
  const location = useLocation();
  const query = useQuery();
  const { userData, setUserData } = useContext(UserContext);
  const [status, setStatus] = React.useState('AWAITING_VERIFICATION');
  const transactionId = query.get('transactionId');

  useEffect(() => {
    window.history.replaceState(null, 'Payement Success', location.pathname);

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
            outcome: 'success',
          },
          {
            headers: { 'x-auth-token': token },
          },
        );

        const response = await axios.get(process.env.REACT_APP_API_URL + '/api/user/payments/' + transactionId, {
          headers: { 'x-auth-token': token },
        });

        setStatus(response.data.transaction.status);

        if (response.data.transaction.status === 'APPROVED') {
          const userResponse = await axios.get(process.env.REACT_APP_API_URL + '/api/user/', {
            headers: { 'x-auth-token': token },
          });

          setUserData({
            ...userData,
            token,
            user: userResponse.data,
          });
        }
      } catch (err) {}
    };

    syncTransaction();
  }, [location.pathname, transactionId]);

  const resultConfig = {
    APPROVED: {
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 72 }} />,
      title: 'نجح الدفع',
      subtitle: 'تم التثبت من العملية وإضافة الرصيد إلى حسابك.',
    },
    FAILED: {
      icon: <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: 72 }} />,
      title: 'فشلت عملية الدفع',
      subtitle: 'لم يتم إضافة أي رصيد إلى حسابك. الرجاء إعادة المحاولة أو الاتصال بالدعم.',
    },
    default: {
      icon: <ClockCircleTwoTone twoToneColor="#faad14" style={{ fontSize: 72 }} />,
      title: 'العملية قيد المراجعة',
      subtitle: 'تم تسجيل العملية وهي الآن في انتظار التثبت من جهة الخادم قبل إضافة الرصيد.',
    },
  };

  const currentResult = resultConfig[status] || resultConfig.default;

  return (
    <Result
      status="info"
      icon={currentResult.icon}
      title={currentResult.title}
      subTitle={
        <div className="PayementSuccess">
          <span>{currentResult.subtitle}</span>
          <br />
          <Link to="/dashboard">العودة إلى الحساب</Link>
        </div>
      }
    />
  );
};

export default PayementSuccess;
