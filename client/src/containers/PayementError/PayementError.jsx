import React from 'react';
import { Result, Button } from 'antd';

const PayementError = () => {
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
