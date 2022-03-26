import React from "react";
import { Link } from "react-router-dom";
import { Form } from "antd";
import { Email,Text, TextArea } from "../../../components/Inputs";
const section_seven = () => {
  const [form] = Form.useForm();
  return (
    <div className="section-seven">
      <div className="title">
      اتصل بنا
      </div>
      <div className="desc">
        إتّصل بمحامٍ مختصّ في أيّ مجال من المجالات القانونيّة لطرح إشكاليّتك.
        يمكنك طرح إشكاليّتك القانونيّة : إمّا بصورة كتابيّة  عبر الهاتف أو بالفيديو عبر المنصة الخاصة بنا. تقع
        إجابتك بصورة فوريّ
      </div>
      <div className="form">
      <Form
        className="container"
        form={form}
        name="register"
        // onFinish={onFinish}
        scrollToFirstError
      >
            <Email label="البريد الالكتروني" name="email" />
            <Text label="الاسم الكامل" name="name" />
            <TextArea label="الموضوع" />

      </Form>
      </div>
      <Link to="/sign-up">
        <button>أرسل</button>
      </Link>
    </div>
  );
};

export default section_seven;
