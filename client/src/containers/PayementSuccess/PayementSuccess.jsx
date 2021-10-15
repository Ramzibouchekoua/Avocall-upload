import React from 'react';
import { Result, Button } from 'antd';

const PayementSuccess = () => {
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
