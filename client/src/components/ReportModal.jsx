import React, { useEffect, useState } from 'react';
import { Modal, Input } from 'antd';
import displayNotification from './displayNotification';
import Axios from 'axios';
const ReportModal = ({ visible, handleCancel, handleOk, userOwner }) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [descriptionForm, setDescriptionForm] = useState('');
  useEffect(() => {
    console.log('first', userOwner);
  }, []);
  const submitForm = () => {
    if (userOwner && descriptionForm) {
      const dataObject = {
        name: userOwner.name,
        email: userOwner.email,
        phone: userOwner.phone,
        description: descriptionForm,
        type: 'Consultation Problem',
      };
      setLoading(true);
      postData(dataObject);
    } else displayNotification('error', 'خطأ', 'يرجى ملء جميع الفراغات في النموذج قبل الإرسال. شكرًا لك');
  };
  const postData = async (data) => {
    try {
      // Make a POST request using Axios
      await Axios.post(process.env.REACT_APP_API_URL + '/api/form/sendEmailForm', data);
      // Handle response data
      displayNotification('success', 'تم', ' شكرًا لك');
      setLoading(false);
      setDone(true);
    } catch (error) {
      // Handle errors
      displayNotification('error', 'خطأ', 'حاول مرة أخرى. شكرًا لك');
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setDescriptionForm(e.target.value);
  };
  return (
    <Modal title="مشكلة في الإستشارة" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      {done ? (
        <div className="modal-report-consultation">
          <h4>تم إبلاغنا بالمشكلة التي تواجهك في الاستشارة، وسنتصل بك قريبًا </h4>
          <h3>شكرًا لإبلاغك لنا</h3>
          <button className="connexion" onClick={handleCancel}>
            العودة للاستشارة
          </button>
        </div>
      ) : (
        <div className="modal-report-consultation">
          {' '}
          <Input.TextArea value={descriptionForm} placeholder="المشكل" onChange={handleChange} />
          <button onClick={submitForm} className={loading ? 'connexion cursor-not-allowed' : 'connexion'}>
            إرسال
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ReportModal;
