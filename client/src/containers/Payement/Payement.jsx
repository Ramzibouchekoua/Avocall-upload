import React from 'react';
import Paypal from '../../assets/images/paypal.png';
import { Menu, Dropdown, Button, message } from 'antd';
import { DownOutlined, CheckOutlined, PaperClipOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import axios from 'axios';

const Mounth = (
  <Menu>
    <Menu.Item key="1">جانفي</Menu.Item>
    <Menu.Item key="2">فيفري</Menu.Item>
    <Menu.Item key="3">مارس</Menu.Item>
    <Menu.Item key="4">أفريل</Menu.Item>
    <Menu.Item key="5">ماي</Menu.Item>
    <Menu.Item key="6">جوان</Menu.Item>
    <Menu.Item key="7">جويلية</Menu.Item>
    <Menu.Item key="8">أوت</Menu.Item>
    <Menu.Item key="9">سبتمبر</Menu.Item>
    <Menu.Item key="10">أكتوبر</Menu.Item>
    <Menu.Item key="11">نوفمبر</Menu.Item>
    <Menu.Item key="12">ديسمبر</Menu.Item>
  </Menu>
);

const Year = (
  <Menu>
    <Menu.Item key="1">2020</Menu.Item>
    <Menu.Item key="2">2021</Menu.Item>
    <Menu.Item key="3">2022</Menu.Item>
    <Menu.Item key="4">2023</Menu.Item>
    <Menu.Item key="5">2024</Menu.Item>
    <Menu.Item key="6">2025</Menu.Item>
    <Menu.Item key="7">2026</Menu.Item>
    <Menu.Item key="8">2027</Menu.Item>
    <Menu.Item key="9">2028</Menu.Item>
    <Menu.Item key="10">2029</Menu.Item>
    <Menu.Item key="10">2030</Menu.Item>
  </Menu>
);

const packs = [
  {
    id: 1,
    title: 'إستشارة',
    price: '29TND',
    nbr: 1
  },
  {
    id: 2,
    title: 'عرض : 3 إستشارات',
    price: '69TND',
    nbr: 3
  }
];

const Payement = () => {
  const [isChecked, setIsChecked] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const history = useHistory();

  const onFileChange = event => {
    setSelectedFile(event.target.files);
  };

  const onClick = async () => {
    const formData = new FormData();
    selectedFile && Object.values(selectedFile).map(e => formData.append('file', e, e.name));
    let filename = '';

    if (isEmpty(isChecked)) {
      message.warning('اختر الباقة المناسبة');
    }
    if (isEmpty(selectedFile)) {
      message.warning('الرجاء تحميل صورة');
    }
    if (!isEmpty(isChecked) && !isEmpty(selectedFile)) {
      try {
        let token = localStorage.getItem('auth-token');
        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }

        const upFile = await axios.post('http://localhost:5000/api/file/upload', formData, {
          headers: { 'x-auth-token': token }
        });

        filename = upFile.data.data.fileName;
        message.success('uploaded');

        const newConsultation = await axios.post(
          'http://localhost:5000/api/user/buyPack',
          {
            consultationNumber: isChecked.nbr,
            filename
          },
          {
            headers: { 'x-auth-token': token }
          }
        );
        // message.success("باقتك اضيفت الى الرصيد بنجاح")
        history.push('/OrderConfirmation');
      } catch (err) {
        console.log('error in buypack', err);
        history.push('/PayementError');
      }
    }
  };

  return (
    <div className="Payement">
      <div className="Left">
        <span className="title"> اختر خطة الاشتراك المناسبة لك</span>

        <div className="pricings">
          {packs.map(e => (
            <div
              onClick={() => setIsChecked(e)}
              className={isChecked.id === e.id ? 'card-type checked' : 'card-type'}
              key={e.id}
            >
              <CheckOutlined />
              <span className="title">{e.title}</span>
              <span className="price">{e.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="Right">
        <span className="title">اختر طريقة الدفع المناسبة لك</span>
        <span className="under-title">يمكنك الدفع عبر باي بال او عبر استعمال بطاقتك البنكية</span>
        <input type="file" name="file" onChange={onFileChange} multiple />
        <Button icon={<PaperClipOutlined />}>رفع ملف مرفق</Button>
        <div className="payement-logo">
          <img src={Paypal} alt="Paypal" />
        </div>
        <button className="pay" onClick={onClick}>
          Finaliser
        </button>
      </div>
    </div>
  );
};

export default Payement;
