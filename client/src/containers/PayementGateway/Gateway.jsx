import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Paypal from '../../assets/images/ClicToPay_logo.png';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Gateway = () => {
  let query = useQuery();
  return (
    <div className="gateway">
      <span>البطاقات الممكن استعمالها </span>
      <img src={Paypal} alt="Clicktopay" />
      <a href={`https://ipay.clictopay.com/payment/merchants/CLICTOPAY/payment_en.html?mdOrder=${query.get('orderId')}`}>
        الدفع
      </a>
      <span>نظام الدفع آمن إذا تعرضت الى اي اشكال</span>
      <Link className="contact" to="/contact">
        {' '}
        اتصل بنا
      </Link>
    </div>
  );
};

export default Gateway;
