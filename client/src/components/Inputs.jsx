import React from "react";
import { Form, Input, Select } from "antd";
const { Option } = Select;

export const Text = ({ label, name, value,rule,placeholder }) => {
  return (
    <Form.Item label={label} name={name} rules={[{ required: rule }]}>
      <Input defaultValue={value} placeholder={placeholder} />
    </Form.Item>
  );
};
export const TextArea = ({ label, name, value }) => {
  return (
    <Form.Item label={label} name={name}>
      <Input.TextArea value={value} />
    </Form.Item>
  );
};

export const Number = ({ label, name, value }) => {
  return (
    <Form.Item label={label} name={name}>
      <Input
        onChange={(e) => /(\++\d+)/.test(Number(e.target.value))}
        defaultValue={value}
      />
    </Form.Item>
  );
};

export const Email = ({ label, name, value }) => {
  return (
    <Form.Item label={label} name={name}>
      <Input defaultValue={value} />
    </Form.Item>
  );
};

export const Password = ({ label, name }) => {
  return (
    <Form.Item
      label={label}
      name={name}
    >
      <Input.Password />
    </Form.Item>
  );
};

export const List = ({ label, name,list, value }) => {
  return (
    <Form.Item label={label} name={name}>
      <Select allowClear defaultValue={value}>
        {
          list.map((e,i)=> <Option value={e} key={i}>{e}</Option>)
        }
        <Option value="other">أخرى</Option>
      </Select>
    </Form.Item>
  );
};
