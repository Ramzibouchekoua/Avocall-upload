import React, { useState, useEffect } from 'react';
import { Form, message, Button, DatePicker, Spin } from 'antd';
import { List, Text, TextArea } from '../../components/Inputs';
import { VideoCameraOutlined, FormOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import displayNotification from '../../components/displayNotification';
const WrittenAdvice = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileIds, setFileIds] = useState([]);
  const [isChecked, setIsChecked] = useState('');
  const [dateString, setDateString] = useState('');
  const [active, setActive] = useState(true);
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      let authToken = localStorage.getItem('auth-token');
      if (!authToken) {
        // Redirect to sign-in page if auth token is not present
        window.location.href = '/sign-in';
      } else {
        const userResponse = await axios.get(process.env.REACT_APP_API_URL + `/api/user/`, {
          headers: {
            'x-auth-token': authToken,
          },
        });
        setUserData(userResponse.data);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    }
  };
  const submitRequest = async (values) => {
    console.log('first', values);
    const formData = new FormData();
    selectedFile && Object.values(selectedFile).map((e) => formData.append('file', e, e.name));
    let filename = '';
    try {
      let token = localStorage.getItem('auth-token');

      if (userData.wallet < 1) {
        displayNotification('error', 'خطأ', 'ليس لديك إستشارات');
        history.push('/checkout');

        return;
      }
      if (!isChecked) {
        displayNotification('error', 'خطأ', 'نوع الإستشارة إجباري');
        return;
      }
      if (!values.title) {
        displayNotification('error', 'خطأ', 'عنوان الاستشارة إجباري');
        return;
      }
      if (!dateString) {
        displayNotification('error', 'خطأ', 'التاريخ إجباري');
        return;
      }

      if (!_.isEmpty(selectedFile)) {
        const upFile = await axios.post(process.env.REACT_APP_API_URL + '/api/file/upload', formData, {
          headers: { 'x-auth-token': token },
        });
        filename = upFile.data.data.fileName;
        try {
          setFileIds(fileIds.concat(upFile.data.data._id));
          message.success('uploaded');
          displayNotification('success', 'أحسنت', ' تم رفع الملف بنجاح');

          setActive(true);
        } catch (err) {
          displayNotification('error', 'خطأ', 'حاول مرة اخرى');

          setActive(true);
        }
      }
      setFileIds((state) => {
        return state;
      });
      setActive(false);
      const newCons = await axios.post(
        process.env.REACT_APP_API_URL + '/api/user/newConsultation',
        {
          ...values,
          files: values.files ? values.files.concat(fileIds) : [],
          type: isChecked,
          date: dateString,
          name: userData.name,
          filename,
        },
        {
          headers: { 'x-auth-token': token },
        }
      );
      displayNotification('success', 'أحسنت', ' تم حجز الموعد بنجاح');

      const consultationId = newCons.data.consultation._id;
      isChecked === 'video' ? history.push(`/vid-page/${consultationId}`) : history.push(`/text-chat/${consultationId}`);
      setActive(true);
    } catch (err) {
      setActive(true);

      displayNotification('error', 'خطأ', 'يرجى المحاولة مرة أخرى أو الاتصال بنا ');
    }
  };

  const DescForm = () => (
    <Form name="nest-messages" className="body" onFinish={submitRequest}>
      <div className="form">
        <div className="section-right">
          <Text label="موضوع الاستشارة" name="title" />
          <List
            label="تصنيف الاستشارة"
            name="field"
            list={[
              ' إستخلاص دين',
              'قانون جزائي',
              'قانون البنكي',
              'قانون التأمين',
              'قانون الشركات التجارية',
              'قانون عقّاري',
              'قانون الجبائي',
              'قانون الشغل',
              'نزاعات الجوار ',
              'قانون الأسرة',
              'قانون الأكرية',
              'حادث',
            ]}
          />
          {/* <Upload {...props}> */}
          <input type="file" name="file" onChange={onFileChange} multiple /> {/* </Upload> */}
        </div>
        <div className="section-left">
          <Form.Item label="تاريخ الاستشارة*">
            <DatePicker
              showTime
              onChange={(v, d) => setDateString(d)}
              bordered={false}
              disabledDate={(current) => current && current < moment().endOf('day')}
              placeholder=""
            />
          </Form.Item>
          <TextArea label="تفاصيل الاستشارة" name="description" />
        </div>
      </div>
      <Form.Item>
        <Button htmlType="submit" className={active ? 'submit-button ' : 'disabled'}>
          حجز موعد
        </Button>
      </Form.Item>
    </Form>
  );
  return (
    <div className="written-advice">
      <div className="head">
        <div className="title">استشارة جديدة</div>
        <div className="title-black"> حجز موعد مع محام متخصص </div>

        <div className="pricing">
          <div className={isChecked === 'text' ? 'card-type checked' : 'card-type'} onClick={(e) => setIsChecked('text')}>
            <FormOutlined />
            <span className="consultationtype">إستشارة عبر الارساليات</span>
          </div>
          <div className={isChecked === 'video' ? 'card-type checked' : 'card-type'} onClick={(e) => setIsChecked('video')}>
            <VideoCameraOutlined />
            <span className="consultationtype">إستشارة بالفيديو</span>
          </div>
          <div
            className={isChecked === 'whatsapp' ? 'card-type checked' : 'card-type'}
            onClick={(e) => setIsChecked('whatsapp')}
          >
            <FormOutlined />
            <span className="consultationtype">إستشارة عبر الواتساب</span>
          </div>
          <div className={isChecked === 'sms' ? 'card-type checked' : 'card-type'} onClick={(e) => setIsChecked('sms')}>
            <FormOutlined />
            <span className="consultationtype">إستشارة عبر الرسائل النصية</span>
          </div>
        </div>
        {active ? DescForm() : <Spin tip="جاري..." />}
      </div>
    </div>
  );
};

export default WrittenAdvice;
