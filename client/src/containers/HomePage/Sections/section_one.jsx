import React from 'react';
import { Link } from 'react-router-dom';

import Phone from '../../../assets/icons/4014702_call_phone_service_support_icon (1).svg';


const Section_one = () => {
  return (
    <div className="section-one">
      <div className="bg"></div>
      <div className="part right">
        <div className="icon-container">
          <div className="icon"></div>
        </div>
        <div className="title">إستشارة كتابيّة</div>
        <div className="desc">
          إطرح إشكاليّتك القانونيّة بصورة كتابيّة. تقع إجابتك كتابيّا بصورة فوريّة من طرف محامي مختصّ في أيّ مجال من المجالات
          القانونيّة التي تختارها.
        </div>
        <Link to="/sign-up">
          {' '}
          <button>التسجيل</button>
        </Link>
      </div>
      <div className="part left">
        <div className="icon-container">
          <div className="icon"></div>
        </div>
        <div className="title"> إستشارة هاتفية أو بالفيديو</div>
        <div className="desc">
          إتصل مباشرة بمحامي مختصّ عبر الهاتف أو بالفيديو عبر المنصة الخاصة بنا لطرح إشكاليّتك القانونيّة و سوف تحصل على
          الإجابة فورا.
        </div>
        <div  style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1rem' }}>
            <span style={{ color: 'white' }} dir="ltr">
              +216 22 250 738
            </span>
            <img src={Phone} alt="" style={{ width: '2rem' }} />
          </div>
          <Link to="/sign-up"> 
            <button>التسجيل </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section_one;
