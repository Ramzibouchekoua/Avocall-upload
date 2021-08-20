import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, message, Button, Upload, DatePicker, Spin } from 'antd';
import { List, Text, TextArea } from '../../components/Inputs';
import { PaperClipOutlined, VideoCameraOutlined, FormOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { InlineWidget } from 'react-calendly';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
const WrittenAdvice = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isChecked, setIsChecked] = useState('');
  const [theConsultation, setTheConsultation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const consultationId = id;
  const [dateString, setDateString] = useState('');
  const history = useHistory();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_API_URL + `/api/user/consultation/${consultationId}`, {
          headers: {
            'x-auth-token': localStorage.getItem('auth-token'),
          },
        });
        setTheConsultation(res.data[0]);
        setIsLoading(false);
      } catch {
        console.log("couldn't get data");
      }
    };
    getData();
    setIsChecked(theConsultation.type);
  }, []);
  useEffect(() => {
    theConsultation && setIsChecked(theConsultation.type);
  }, [theConsultation]);
  // console.log(history.go("https://call-object-react.netlify.app/?roomUrl=https%3A%2F%2Fdailyphil.daily.co%2FGMGj6dPwbXaycZhblXjb"))

  const submitRequest = async (values) => {
    const formData = new FormData();
    Object.values(selectedFile).map((e) => formData.append('file', e, e.name));
    try {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      if (!_.isEmpty(selectedFile)) {
        const upFile = await axios.post(process.env.REACT_APP_API_URL + '/api/file/upload', formData, {
          headers: { 'x-auth-token': token },
        });
        try {
          message.success('uploaded');
        } catch (err) {
          message.warning('error');
        }
      }
      const newCons = await axios.put(
        process.env.REACT_APP_API_URL + `/api/user/updateConsultation/${consultationId}`,
        { ...values, type: isChecked, date: dateString },
        {
          headers: { 'x-auth-token': token },
        }
      );
      const newConsultationId = newCons.data.newConsultation._id;
      isChecked === 'video'
        ? history.push(`/vid-page/${newConsultationId}`)
        : history.push(`/text-chat/${newConsultationId}`);
    } catch (err) {
      message.warning('error', err);
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
  const DescForm = () => {
    return (
      <Form
        name="nest-messages"
        className="body"
        onFinish={submitRequest}
        initialValues={{
          title: theConsultation.title,
          field: theConsultation.field,
          description: theConsultation.description,
        }}
      >
        <div className="form">
          <div className="section-right">
            <Text label="موضوع الاستشارة" name="title" rule={true} />
            <List label="تصنيف الاستشارة" name="field" list={['قانون الأُسرة', 'قانون الشغل']} />

            {/* <Upload {...props}> */}
            <input type="file" name="file" onChange={onFileChange} multiple />
            <Button icon={<PaperClipOutlined />}>رفع ملف مرفق</Button>
            {/* </Upload> */}
          </div>
          <div className="section-left">
            <Form.Item label="تاريخ الاستشارة*" rules={[{ required: true }]}>
              <DatePicker
                showTime
                onChange={(v, d) => setDateString(d)}
                bordered={false}
                disabledDate={(current) => current && current < moment().endOf('day')}
                defaultValue={moment(theConsultation.date)}
              />
            </Form.Item>
            <TextArea label="تفاصيل الاستشارة" name="description" />
          </div>
        </div>

        <Form.Item>
          <Button htmlType="submit" className="submit-button">
            تعديل الاستشارة
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <div className="written-advice">
      <div className="head">
        <div className="title">تعديل استشارة</div>
        <div className="pricing">
          <div className={isChecked === 'text' ? 'card-type checked' : 'card-type'} onClick={(e) => setIsChecked('text')}>
            <FormOutlined />
            <span>إستشارة كتابيّة</span>
          </div>
          <div className={isChecked === 'video' ? 'card-type checked' : 'card-type'} onClick={(e) => setIsChecked('video')}>
            <VideoCameraOutlined />
            <span>إستشارة بالفيديو</span>
          </div>

          {/* <input
            type="button"
            value="call"
            name="call"
            onClick={(e) => setIsChecked(e.target.name)}
            className={isChecked === 'call' ? 'card-type checked' : 'card-type'}
          /> */}
        </div>
        {isLoading ? <Spin tip="جاري..." spinning={isLoading} /> : DescForm()}
        {/* {Book()} */}
      </div>
    </div>
  );
};

export default WrittenAdvice;
