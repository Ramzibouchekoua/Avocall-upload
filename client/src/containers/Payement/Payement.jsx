import React from 'react';
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
    packCode: 'OLD_PACK_1',
    price: '100TND',
    nbr: 1,
    amount: 100000,
    duration: 12,
  },
  {
    id: 2,
    title: 'استشارة فورية',
    packCode: 'OLD_PACK_2',
    price: '149TND',
    nbr: 1,
    amount: 149000,
    duration: 12,
  },
  // New packs
  {
    id: 3,
    title: 'باقة شهر',
    packCode: 'NEW_PACK_1M',
    price: '199TND',
    nbr: 3,
    amount: 1001,
    duration: 1,
  },
  {
    id: 4,
    title: 'باقة 6 شهور',
    packCode: 'NEW_PACK_6M',
    price: '999TND',
    nbr: 15,
    amount: 999000,
    duration: 6,
  },
  {
    id: 5,
    title: 'باقة سنة',
    packCode: 'NEW_PACK_12M',
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

        const response = await axios.post(
          process.env.REACT_APP_API_URL + '/api/user/payments/bank-transfer',
          {
            packCode: isChecked.packCode,
            filename,
          },
          {
            headers: { 'x-auth-token': token },
          },
        );
        displayNotification('success', 'تم', 'سيضاف لكم الرصيد في اجل اقصاه 48 ساعة شكرا');

        setActive(true);
        setTimeout(() => {
          history.push('/payment-pending?transactionId=' + response.data.transaction._id);
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
              <CheckOutlined className="check-icon" />
              <div className="card-content">
                <span className="title">{e.title}</span>
                <span className="price">{e.price}</span>
                <div className="meta-row">
                  <span className="consultations-count">{e.nbr} استشارات</span>
                  <span className="duration">{getDurationLabel(e.duration)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="Right">
        <span className="title">اختر طريقة الدفع المناسبة لك</span>
        <span className="under-title">يمكنك الدفع عبر حوالة مصرفية او عبر استعمال بطاقتك البنكية</span>
        <div className="credit-card">
          <span>للدفع عبر البطاقة المصرفية اختر العرض المرغوب فيه</span>
          {isChecked.packCode && (
            <Link to={`/OrderConfirmation?packCode=${isChecked.packCode}`}>
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
