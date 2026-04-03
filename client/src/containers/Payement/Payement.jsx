import React from 'react';
import { message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { Link } from 'react-router-dom';
import displayNotification from '../../components/displayNotification';

const packs = [
  // Old packs – kept for backward compatibility, 1-year expiration
  {
    id: 1,
    title: 'إستشارة',
    price: '100TND',
    nbr: 1,
    amount: 100000,
    duration: 12,
  },
  {
    id: 2,
    title: 'استشارة فورية',
    price: '199TND',
    nbr: 1,
    amount: 199000,
    duration: 12,
  },
  // New packs
  {
    id: 3,
    title: 'باقة شهر',
    price: '199TND',
    nbr: 3,
    amount: 199001,
    duration: 1,
  },
  {
    id: 4,
    title: 'باقة 6 شهور',
    price: '999TND',
    nbr: 15,
    amount: 999000,
    duration: 6,
  },
  {
    id: 5,
    title: 'باقة سنة',
    price: '1799TND',
    nbr: 30,
    amount: 1799000,
    duration: 12,
  },
];

const getDurationLabel = (months) => {
  if (months === 1) return 'صالحة لمدة شهر';
  if (months === 12) return 'صالحة لمدة سنة';
  return `صالحة لمدة ${months} شهور`;
};

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
      displayNotification('error', 'خطأ', 'اختر الباقة المناسبة');
    }
    if (isEmpty(selectedFile)) {
      displayNotification('error', 'خطأ', 'الرجاء تحميل صورة');
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
        displayNotification('success', 'تم', 'تم تحميل الصورة');

        const newConsultation = await axios.post(
          process.env.REACT_APP_API_URL + '/api/user/buyPack',
          {
            packCode: isChecked.packCode,
            amount: isChecked.amount,
            filename,
          },
          {
            headers: { 'x-auth-token': token },
          }
        );
        displayNotification('success', 'تم', 'سيضاف لكم الرصيد في اجل اقصاه 48 ساعة شكرا');

        //history.push('/OrderConfirmation');
        setActive(true);
        setTimeout(() => {
          history.push('/written-advice');
        }, 5000);
      } catch (err) {
        displayNotification('error', 'خطأ', 'حاول مرة أخرى. شكرًا لك');

        setActive(true);
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
              className={`${isChecked.id === e.id ? 'card-type checked' : 'card-type'}${e.id === 2 ? ' emergency' : ''}`}
              key={e.id}
            >
              <CheckOutlined />
              <span className="title">{e.title}</span>
              <span className="old-price">{e.oldprice}</span>
              <span className="price">{e.price}</span>
              <span className="duration">{getDurationLabel(e.duration)}</span>
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
