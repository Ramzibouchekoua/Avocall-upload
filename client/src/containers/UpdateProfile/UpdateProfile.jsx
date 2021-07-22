import React, { useContext, useState } from "react";
import axios from "axios";
import { Form, Button } from "antd";
import { Text, Email, Number } from "../../components/Inputs";
import UserContext from "../../context/userContext";

const Update = ({ user = {} }) => {
  const [form] = Form.useForm();
 
  const { setUserData } = useContext(UserContext);
  
  const onFinish = async (values) => {
    try {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const newUser = await axios.put(
        'http://localhost:5000/api/user/update',
        { ...values},
        {
          headers: { 'x-auth-token': token },
        }
      );
      setUserData({ user:newUser})
    } catch (err) {
    }
  };

  return (
    <div className="update-profile">
      <h1>تعديل الحساب</h1>
      <Form
        className="Container"
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        initialValues={{
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        }}
      >
        <div className="right-Signup">
          <Email label="البريد الالكتروني" value={user.email} name="email" />
          <Number label="رقم الهاتف " value={user.phone} name="phone" />
        </div>
        <div className="Left-Signup">
          <Text label="الاسم الكامل" value={user.name} name="name" />
          <Text label="مقر السكنى" value={user.address} name="address" />
        </div>
        <Form.Item>
            <Button htmlType="submit">احفظ</Button>
          </Form.Item>
      </Form>
    </div>
  );
};

export default Update;
