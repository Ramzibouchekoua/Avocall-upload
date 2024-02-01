import React from 'react';
import { Text } from '../../components/Inputs';
import FormSub from './fromSub';
import displayImg from '../../assets/images/contact-us-showcase.png';

function contact() {
  return (
    <div className="contact-us">
      <p>لجعل المسافة أقصر مع مستشارنا أو الدعم الفني يمكنك الاتصال بنا من هنا وسنقوم بالرد عليك في أسرع وقت ممكن</p>
      <b>شكراً جزيلاً</b>
      <div className="contact-us-content">
        <FormSub />
        <img src={displayImg} alt="Avocall contact us page" />
      </div>
    </div>
  );
}

export default contact;
