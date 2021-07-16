import React from "react";
import { Form, Upload, Button, message } from "antd";
import { Text, Email, Password, Number, List } from "../../components/Inputs";
import { PaperClipOutlined } from "@ant-design/icons";
const SignupPro = () => {
  const [form] = Form.useForm();
  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
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
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="registration">
      <h1>تعديل الحساب</h1>

      <Form
        className="Container"
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <div className="Right-Signup">
          <Text label="الاسم الكامل" />
          <Password label="كلمة السر" />
          <Number label="رقم الهاتف " />
          <List label="الاختصاص" />
          <Number label="الهوية البنكية" />

          <Form.Item>
            <Button htmlType="submit">احفظ</Button>
          </Form.Item>
        </div>
        <div className="Left-Signup">
          <Email label="البريد الالكتروني" />
          <Text label="عنوان المكتب" />
          <List label="صنف المحامي" />
          <Upload {...props}>
            <Button icon={<PaperClipOutlined />}>شهادة ترسيم أو بطاقة مهنية</Button>
          </Upload>
        </div>
      </Form>
    </div>
  );
};

export default SignupPro;
