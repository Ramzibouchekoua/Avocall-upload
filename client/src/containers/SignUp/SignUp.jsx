import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Form, Checkbox, Button, DatePicker } from 'antd';
import { Text, Email, Password, Number } from '../../components/Inputs';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import moment from 'moment';
import { GoogleLogin } from 'react-google-login';
import displayNotification from '../../components/displayNotification';

// const clientId = '592293472212-psaab73gie2sf6c40r2i9qang27ts35t.apps.googleusercontent.com';

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
      loginRes.data.user.role === 'USER'
        ? history.push('/checkout')
        : loginRes.data.user.role === 'ADMIN'
          ? history.push('/DashboardAdmin')
          : history.push('/');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);

      if (err.response.status === 500) {
        setError(undefined);
        const loginRes = await axios.post(process.env.REACT_APP_API_URL + '/api/auth/googleLogin', {
          ...result,
        });
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });
        localStorage.setItem('auth-token', loginRes.data.token);
        loginRes.data.user.role === 'USER'
          ? history.push('/checkout')
          : loginRes.data.user.role === 'ADMIN'
            ? history.push('/DashboardAdmin')
            : history.push('/');
      }
    }
  };
  const googleError = () => displayNotification('error', 'لم ينجح تسجيل الدخول   حاول مرة أخرى في وقت لاحق');
  const onFinish = async (values) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+\d{1,3}\s?)?\d{8}$/;

    if (!emailRegex.test(values.email)) {
      displayNotification('error', 'خطأ', 'يرجى كتابة  البريد الإلكتروني الصحيح');
      return;
    }
    if (!values.password || values.password.length < 5) {
      displayNotification('error', 'خطأ', 'يجب أن تحتوي كلمة المرور على 6 أحرف أو أكثر');
      return;
    }
    if (!phoneRegex.test(values.phone)) {
      displayNotification('error', 'خطأ', '+216 يرجى كتابة رقم الهاتف المكون من 8 أرقام أو بتنسيق دولي');
      return;
    }

    if (!values.name || values.name.length < 1) {
      displayNotification('error', 'خطأ', 'لا ينبغي أن يكون الاسم فارغًا!');
      return;
    }

    if (!values.address || values.address.length < 1) {
      displayNotification('error', 'خطأ', 'لا ينبغي أن يكون عنوان فارغًا!');
      return;
    }

    if (dateString && moment().year() - moment(dateString).year() < 18) {
      displayNotification('error', 'خطأ', 'هذه الخدمة مقيدة بعمر 18 سنة فما فوق');
      return;
    }
    try {
      setError(undefined);

      const newUser = {
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
        address: values.address,
        birthDate: values.birthDate,
      };

      await axios.post(process.env.REACT_APP_API_URL + '/api/user/register', newUser);
      displayNotification('success', 'تم', ' شكرًا لك');
      history.push('/AccountVerification?name=' + newUser.name);
    } catch (err) {
      const errorMsg = err.response.data.msg || 'حدث خطأ ما';
      setError(errorMsg);
      displayNotification('error', 'خطأ', errorMsg);
    }
  };

  return (
    <div className="registration">
      <div className="google-sign-up">
        <h1>إنشاء حساب جديد من خلال Google </h1>
        <GoogleLogin
          clientId="592293472212-psaab73gie2sf6c40r2i9qang27ts35t.apps.googleusercontent.com"
          buttonText="انشاء حساب جديد"
          className="button-google"
          onSuccess={googleSuccess}
          onFailure={googleError}
          cookiePolicy="single_host_origin"
          isSignedIn={false}
          icon={true}
        />
      </div>
      <h1>تسجيل حساب جديد</h1>

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
                  validator: (_, value) =>
                    value ? Promise.resolve() : displayNotification('error', 'خطأ', 'الرجاء قبول الشروط العامة للإستعمال'),
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
        </div>
      </Form>
    </div>
  );
};

export default Signup;
