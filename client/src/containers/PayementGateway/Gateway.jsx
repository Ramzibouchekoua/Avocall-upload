import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Gateway = () => {
  let query = useQuery();
  return (
    <div className="container">
      <iframe
        name="iframe_name"
        id="iframe_id"
        src={`https://test.clictopay.com/payment/merchants/CLICTOPAY/payment_en.html?mdOrder=${query.get('orderId')}`}
        style={{ width: '100%', height: '700px', border: '0 none' }}
        scrolling="no"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default Gateway;
