import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'antd';
import { Email, Password } from '../../components/Inputs';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import { Link } from 'react-router-dom';
import ErrorNotice from '../../components/ErrorNotice';

import { GoogleLogin } from 'react-google-login';
import displayNotification from '../../components/displayNotification';

const clientId = '592293472212-psaab73gie2sf6c40r2i9qang27ts35t.apps.googleusercontent.com';

const SignIn = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      setError(undefined);
      const loginRes = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email: values.email,
        password: values.password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      localStorage.setItem('role', loginRes.data.user.role);
      loginRes.data.user.role === 'USER' ? history.push('/dashboard') : history.push('/dashboardPro');
    } catch (err) {
      err.response.data.msg && displayNotification('error', 'خطأ', err.response.data.msg);
    }
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    const loginRes = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/googleLogin`, {
      ...result,
    });
    try {
      setError(undefined);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      localStorage.setItem('role', loginRes.data.user.role);
      loginRes.data.user.role === 'USER' ? history.push('/dashboard') : history.push('/dashboardPro');
    } catch (err) {
      err.response.data.msg && displayNotification('error', 'خطأ', err.response.data.msg);
    }
  };

  const googleError = () => displayNotification('error', 'لم ينجح تسجيل الدخول   حاول مرة أخرى في وقت لاحق');

  return (
    <div className="login">
      <div className="google-sign-up">
        <h1>الدخول من خلال Google </h1>
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

      <h1>الدخول</h1>
      {/* {error && (
        <div className="error-notice">
          <ErrorNotice err={error} />
        </div>
      )} */}
      <Form className="container" form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Email label="البريد الالكتروني" name="email" />
        <Password label="كلمة السر" name="password" />

        <Form.Item>
          <Button htmlType="submit" className="button-blue">
            الدخول
          </Button>
        </Form.Item>
        <Link to="/sign-up" className="Connexion">
          التسجيل
        </Link>
      </Form>
    </div>
  );
};

export default SignIn;
