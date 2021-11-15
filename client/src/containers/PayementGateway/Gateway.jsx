import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Gateway = () => {
  let query = useQuery();
  return (
    <div className="container">
      <a
        
        href={`https://test.clictopay.com/payment/merchants/CLICTOPAY/payment_en.html?mdOrder=${query.get('orderId')}`}
     
      >click me</a>
    </div>
  );
};

export default Gateway;
