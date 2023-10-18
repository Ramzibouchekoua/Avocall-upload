import React from 'react';
import { message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { Link } from 'react-router-dom';

const packs = [
  {
    id: 1,
    title: 'إستشارة',
    price: '29TND',
    nbr: 0,
    amount: 29000,
    oldprice: '50TND',
  },
  {
    id: 2,
    title: ' 3 إستشارات',
    price: '69TND',
    nbr: 0,
    amount: 69000,
    oldprice: '90TND',
  },
];

const Payement = () => {
  const [isChecked, setIsChecked] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [active, setActive] = useState(true);
  const history = useHistory();

  const onFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const onClick = async () => {
    const formData = new FormData();
    selectedFile && Object.values(selectedFile).map((e) => formData.append('file', e, e.name));
    let filename = '';

    if (isEmpty(isChecked)) {
      message.warning('اختر الباقة المناسبة');
    }
    if (isEmpty(selectedFile)) {
      message.warning('الرجاء تحميل صورة');
    }
    if (!isEmpty(isChecked) && !isEmpty(selectedFile)) {
      try {
        setActive(false);
        let token = localStorage.getItem('auth-token');
        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }

        const upFile = await axios.post(process.env.REACT_APP_API_URL + '/api/file/upload', formData, {
          headers: { 'x-auth-token': token },
        });

        filename = upFile.data.data.fileName;
        message.success('uploaded');

        const newConsultation = await axios.post(
          process.env.REACT_APP_API_URL + '/api/user/buyPack',
          {
            consultationNumber: isChecked.nbr,
            filename,
          },
          {
            headers: { 'x-auth-token': token },
          }
        );
        message.success('سيضاف لكم الرصيد في اجل اقصاه 48 ساعة شكرا');
        //history.push('/OrderConfirmation');
        setActive(true);
      } catch (err) {
        alert('error in buypack', err);
        setActive(true);
        history.push('/dashboard');
      }
    }
  };

  return (
    <div className="Payement">
      <div className="Left">
        <span className="title"> اختر خطة الاشتراك المناسبة لك</span>

        <div className="pricings">
          {packs.map((e) => (
            <div
              onClick={() => setIsChecked(e)}
              className={isChecked.id === e.id ? 'card-type checked' : 'card-type'}
              key={e.id}
            >
              <CheckOutlined />
              <span className="title">{e.title}</span>
              <span className="old-price">{e.oldprice}</span>
              <span className="price">{e.price}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="Right">
        <span className="title">اختر طريقة الدفع المناسبة لك</span>
        <span className="under-title">يمكنك الدفع عبر حوالة مصرفية او عبر استعمال بطاقتك البنكية</span>
        <div className="credit-card">
          <span>للدفع عبر البطاقة المصرفية اختر العرض المرغوب فيه</span>
          {isChecked.amount && (
            <Link to={`/OrderConfirmation?amount=${isChecked.amount}`}>
              <button className="ant-btn">البطاقة المصرفية</button>
            </Link>
          )}
        </div>
        <div className="Bank-detail">
          <span className="under-title">للدفع عبر الحوالة البنكية الرجاء ارسال حوالة للحسابات التالية :</span>
          <span className="under-title">
            {' '}
            <b>الرجاء ذكر اسم المستخدم في ملاحظة الحوالة البنكية و التاكد من اسم المستفيد </b>
          </span>{' '}
          <span className="name">Ghedira Avocats et conseils Avocall</span>
          <span className="under-title">من تونس :</span>
          <span className="rib">08 004 0001710003480</span>
          <span className="under-title">من خارج تونس :</span>
          <span className="rib">TN59 0800 4000 1710 0034 8023</span>
          <span className="under-title">الرجاء تحميل إثبات الدفع من هنا</span>
        </div>
        <input type="file" name="file" onChange={onFileChange} multiple />

        <button className={active ? 'pay' : 'disabled-button'} onClick={onClick}>
          إرسال الطلب
        </button>
      </div>
    </div>
  );
};

export default Payement;
