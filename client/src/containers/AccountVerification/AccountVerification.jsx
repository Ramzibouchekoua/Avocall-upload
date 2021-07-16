import React from 'react';
import { Result } from 'antd';

const AccountVerification = () => {
  return (
    <Result
      status="success"
      title="شكرا"
      subTitle={
        <div className="PayementError">
          <span> لقد ارسلنا لك بريد الكتروني لتفعيل الحساب الخاص بك </span>
          <span>الرجاء تفعيل الحساب للتمتع بخدمتنا</span>
        </div>
      }
    />
  );
};

export default AccountVerification;
