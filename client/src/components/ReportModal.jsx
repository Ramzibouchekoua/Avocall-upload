import React from "react";
import { Form, Modal } from "antd";
import { Text, TextArea, Email } from "./Inputs";
const ReportModal = ({ visible, handleCancel, handleOk }) => {
  const [form] = Form.useForm();
  
  return (
    <Modal
      title="مشكلة في الإستشارة"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        className="Container"
        form={form}
        name="register"
        // onFinish={onFinish}
        scrollToFirstError
      >
        <Email label="البريد الالكتروني" name="email" />
        <Text label="الاسم الكامل" name="name" />
        <TextArea label="المشكل" name="description" />
      </Form>
    </Modal>
  );
};

export default ReportModal;
