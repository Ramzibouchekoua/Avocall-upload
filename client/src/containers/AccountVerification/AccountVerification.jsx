import React, { useEffect, useState } from 'react';
import { Result } from 'antd';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AccountVerification = () => {
  const history = useHistory();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    // Call verification function if token exists
    if (name) {
      setUserName(name);
    } else {
      history.push('/sign-up');
    }
  }, []);
  return (
    <Result
      status="success"
      title="شكرا"
      subTitle={
        <div className="PayementError">
          <h2>{'مرحباً' + ' ' + userName}</h2>
          <span> لقد ارسلنا لك بريد الكتروني لتفعيل الحساب الخاص بك </span>
          <span>الرجاء تفعيل الحساب للتمتع بخدمتنا</span>
        </div>
      }
    />
  );
};

export default AccountVerification;
