import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import displayNotification from '../../components/displayNotification';
import Axios from 'axios';

const FormSub = () => {
  const [nameForm, setNameForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [phoneForm, setPhoneForm] = useState('');
  const [descriptionForm, setDescriptionForm] = useState('');
  const [type, setType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const typeForm = () => {
    setType(!type);
  };
  const handleNameChange = (e) => {
    setNameForm(e.target.value);
  };
  const handleNameOnBlur = () => {
    if (nameForm.length < 2) {
      displayNotification('error', 'خطأ', 'لا ينبغي أن يكون الاسم فارغًا!');
      setNameForm('');
    }
  };

  const handleEmailChange = (e) => {
    setEmailForm(e.target.value);
  };
  const handleEmailBlur = () => {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailForm)) {
      displayNotification('error', 'خطأ', 'يرجى كتابة عنوان البريد الإلكتروني الصحيح');
      setEmailForm('');
    }
  };

  const handlePhoneChange = (e) => {
    setPhoneForm(e.target.value);
  };
  const handlePhoneOnBlur = () => {
    // Regular expression for validating phone numbers (8 digits only or international format)
    const phoneRegex = /^(\+\d{1,3}\s?)?\d{8}$/;
    // Check if the phone number matches the regex pattern
    if (!phoneRegex.test(phoneForm)) {
      displayNotification('error', 'خطأ', '+216 يرجى كتابة رقم الهاتف المكون من 8 أرقام أو بتنسيق دولي');
      setPhoneForm('');
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length < 2) {
      displayNotification('error', 'خطأ', 'لا ينبغي أن يكون الوصف فارغًا!');
      setDescriptionForm('');
    } else setDescriptionForm(e.target.value);
  };

  const submitForm = () => {
    if (emailForm && nameForm && phoneForm && descriptionForm) {
      const dataObject = {
        name: nameForm,
        email: emailForm,
        phone: phoneForm,
        description: descriptionForm,
        type: type ? 'pro' : 'clarification',
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
  return (
    <>
      {done ? (
        <h1 className="success-message-form"> شكرا لتواصلك معنا سنعود إليك في أسرع وقت ممكن. </h1>
      ) : (
        <Form>
          {' '}
          <Form.Item>
            <div className="type-form">
              <span className={type ? 'form-pro-active' : 'form-pro'} onClick={typeForm}>
                استشارات للشركات
              </span>{' '}
              <span className={type ? 'form-user' : 'form-user-active'} onClick={typeForm}>
                اتصل بنا
              </span>
            </div>
          </Form.Item>
          <Form.Item label="الاسم" name="الاسم" rules={[{ required: true }]}>
            <Input value={nameForm} placeholder="الاسم" onChange={handleNameChange} onBlur={handleNameOnBlur} />
          </Form.Item>
          <Form.Item label="بريد إلكتروني" name="بريد إلكتروني" rules={[{ required: true }]}>
            <Input value={emailForm} placeholder="بريد إلكتروني" onChange={handleEmailChange} onBlur={handleEmailBlur} />
          </Form.Item>
          <Form.Item label="رقم الهاتف" name="رقم الهاتف" rules={[{ required: true }]}>
            <Input value={phoneForm} placeholder="رقم الهاتف" onChange={handlePhoneChange} onBlur={handlePhoneOnBlur} />
          </Form.Item>
          <Form.Item label="الوصف" name="الوصف" rules={[{ required: true }]}>
            <Input.TextArea value={descriptionForm} placeholder="الوصف" onChange={handleDescriptionChange} />
          </Form.Item>
          <Form.Item>
            <button
              type="primary"
              htmlType="submit"
              onClick={submitForm}
              className={loading ? 'not-allowed' : 'button-form-contact'}
            >
              ارسال
            </button>
          </Form.Item>{' '}
        </Form>
      )}
    </>
  );
};

export default FormSub;
