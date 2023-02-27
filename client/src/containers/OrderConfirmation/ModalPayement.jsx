import React from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ModalPayement({ setIsModalOpen, url, isModalOpen }) {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal open={isModalOpen}>
        <div className="gateway">
          <span>البطاقات الممكن استعمالها </span>
          {/* <img src={Paypal} alt="Clicktopay" /> */}
          <a href={url}>الدفع</a>
          <span>نظام الدفع آمن إذا تعرضت الى اي اشكال</span>
          <a className="contact" href="https://avocall.tn/contactez-nous">
            {' '}
            اتصل بنا
          </a>
          <Link to="/checkout" className="contact">
            العودة إلى قائمة الاختيارات
          </Link>
        </div>
      </Modal>
    </>
  );
}

export default ModalPayement;
