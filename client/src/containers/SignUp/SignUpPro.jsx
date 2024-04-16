import React, { useState, useContext } from 'react';
import { Form, Checkbox, Button, message, Upload } from 'antd';
import { Text, Email, Password, Number, List } from '../../components/Inputs';
import { PaperClipOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import ErrorNotice from '../../components/ErrorNotice';
const SignupPro = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [error, setError] = useState();
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const onFinish = async (values) => {
    try {
      setError(undefined);
      const newUser = {
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
        address: values.address,
        specialization: values.specialization,
        bankId: values.bankId,
        classing: values.classing,
      };
      await axios.post(process.env.REACT_APP_API_URL + '/api/userpro/register', newUser);
      history.push('/Welcomemsg');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="registration">
      <h1>تسجيل حساب جديد</h1>
      {error && (
        <div className="error-notice">
          <ErrorNotice err={error} />
        </div>
      )}
      <Form className="Container" {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <div className="form-input">
          <div className="Right-Signup">
            <Text label="الاسم الكامل" name="name" />
            <Password label="كلمة السر" name="password" />
            <Number label="رقم الهاتف " name="phone" />
            <List
              label="الاختصاص"
              name="specialization"
              list={['قانون الأكرية', 'قانون الشغل', 'قانون التأمين', 'قانون الأسرة']}
            />
            <Number label="الهوية البنكية" name="bankId" />
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : setError('الرجاء قبول الشروط العامة للإستعمال')),
                },
              ]}
            >
              <Checkbox>
                لقد قرأت و قبلت <a href="/">الشروط العامة للاستعمال</a>
              </Checkbox>
            </Form.Item>
          </div>
          <div className="Left-Signup">
            <Email label="البريد الالكتروني" name="email" />
            <Text label="عنوان المكتب" name="address" />
            <List
              label="صنف المحامي"
              name="classing"
              list={['قانون الأكرية', 'قانون الشغل', 'قانون التأمين', 'قانون الأسرة']}
            />
            <Upload {...props}>
              <Button icon={<PaperClipOutlined />}>شهادة ترسيم أو بطاقة مهنية</Button>
            </Upload>
          </div>
        </div>
        <div className="form-button">
          <Form.Item>
            <Button htmlType="submit">التسجيل</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default SignupPro;
