import React, { useState, useEffect } from 'react';
import { Form, message, Button, DatePicker, Spin } from 'antd';
import { List, Text, TextArea } from '../../components/Inputs';
import { VideoCameraOutlined, FormOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { InlineWidget } from 'react-calendly';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
const WrittenAdvice = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileIds, setFileIds] = useState([]);
  const [isChecked, setIsChecked] = useState('');
  const [dateString, setDateString] = useState('');
  const [active, setActive] = useState(true);
  const history = useHistory();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const submitRequest = async (values) => {
    const formData = new FormData();
    selectedFile && Object.values(selectedFile).map((e) => formData.append('file', e, e.name));
    let filename = '';
    try {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      if (!isChecked) {
        message.warning('نوع الإستشارة إجباري');
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
          setActive(true);
        } catch (err) {
          message.warning('error');
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
          filename,
        },
        {
          headers: { 'x-auth-token': token },
        }
      );
      const consultationId = newCons.data.consultation._id;
      isChecked === 'video' ? history.push(`/vid-page/${consultationId}`) : history.push(`/text-chat/${consultationId}`);
      setActive(true);
    } catch (err) {
      setActive(true);

      message.warning('ليس لديك إستشارات');
      history.push('/checkout');
    }
  };

  const Book = () => (
    <InlineWidget
      url={`https://calendly.com/istichara/istichara-video`}
      pageSettings={{
        backgroundColor: 'ffffff',
        hideEventTypeDetails: false,
        hideLandingPageDetails: false,
        primaryColor: '202F84',
        textColor: '2F281E',
      }}
      styles={{
        height: '1000px',
      }}
      utm={{
        utmCampaign: 'Spring Sale 2019',
        utmContent: 'Shoe and Shirts',
        utmMedium: 'Ad',
        utmSource: 'Facebook',
        utmTerm: 'Spring',
      }}
    />
  );
  const DescForm = () => (
    <Form name="nest-messages" className="body" onFinish={submitRequest}>
      <div className="form">
        <div className="section-right">
          <Text label="موضوع الاستشارة" name="title" rule={true} />
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
          <Form.Item label="تاريخ الاستشارة*" rules={[{ required: true }]}>
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
          ارسل طلب الاستشارة
        </Button>
      </Form.Item>
    </Form>
  );
  return (
    <div className="written-advice">
      <div className="head">
        <div className="title"> استشارة جديدة</div>
        <div className="pricing">
          <div className={isChecked === 'text' ? 'card-type checked' : 'card-type'} onClick={(e) => setIsChecked('text')}>
            <FormOutlined />
            <span className="consultationtype">إستشارة كتابيّة</span>
          </div>
          <div className={isChecked === 'video' ? 'card-type checked' : 'card-type'} onClick={(e) => setIsChecked('video')}>
            <VideoCameraOutlined />
            <span className="consultationtype">إستشارة بالفيديو</span>
          </div>

          {/* <input
            type="button"
            value="call"
            name="call"
            onClick={(e) => setIsChecked(e.target.name)}
            className={isChecked === 'call' ? 'card-type checked' : 'card-type'}
          /> */}
        </div>
        {active ? DescForm() : <Spin tip="جاري..." />}
      </div>
    </div>
  );
};

export default WrittenAdvice;
