import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Form, Checkbox, Button, DatePicker } from 'antd';
import { Text, Email, Password, Number } from '../../components/Inputs';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import ErrorNotice from '../../components/ErrorNotice';
import moment from 'moment';
import { GoogleLogin } from 'react-google-login';

const clientId = '592293472212-psaab73gie2sf6c40r2i9qang27ts35t.apps.googleusercontent.com';

const Signup = () => {
  const [form] = Form.useForm();
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
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const [error, setError] = useState();
  const [dateString, setDateString] = useState('');

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      setError(undefined);
      const loginRes = await axios.post(process.env.REACT_APP_API_URL + '/api/auth/googleLogin', {
        ...result,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      loginRes.data.user.role === 'USER' ? history.push('/dashboard') : history.push('/dashboardPro');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
      console.log('Google Sign In was not successful', err.response.status == 500);

      if (err.response.status == 500) {
        setError(undefined);
        const loginRes = await axios.post(process.env.REACT_APP_API_URL + '/api/auth/googleLogin', {
          ...result,
        });
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });
        localStorage.setItem('auth-token', loginRes.data.token);
        loginRes.data.user.role === 'USER' ? history.push('/dashboard') : history.push('/dashboardPro');
      }
    }
  };
  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');
  const onFinish = async (values) => {
    try {
      setError(undefined);
      if (dateString && moment().year() - moment(dateString).year() < 18) {
        setError('هذه الخدمة مقيدة بعمر 18 سنة فما فوق');
        return;
      }
      const newUser = {
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
        address: values.address,
        birthDate: values.birthDate,
      };
      await axios.post(process.env.REACT_APP_API_URL + '/api/user/register', newUser);
      history.push('/AccountVerification');
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
            <Email label="البريد الالكتروني" name="email" />
            <Password label="كلمة السر" name="password" />
            <Number label="رقم الهاتف " name="phone" />
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
            <Text label="الاسم الكامل" name="name" />
            <Text label="مقر السكنى" name="address" />
            <Form.Item label="تاريخ الولادة" name="birthDate">
              <DatePicker
                onChange={(v, d) => setDateString(d)}
                bordered={false}
                // disabledDate={(current) => current && current < moment().endOf('day')}
                placeholder=""
                showNow={false}
              />
            </Form.Item>
          </div>
        </div>
        <div className="form-button">
          <Form.Item>
            <Button htmlType="submit">التسجيل</Button>
          </Form.Item>
          <GoogleLogin
            clientId="592293472212-psaab73gie2sf6c40r2i9qang27ts35t.apps.googleusercontent.com"
            buttonText="تسجيل الدخول  Google"
            className="button-google"
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
            isSignedIn={false}
            icon={true}
          />
        </div>
      </Form>
    </div>
  );
};

export default Signup;
