import React from 'react';
import Logo from '../../assets/images/logo@2x.png';
// import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div className="footer">
      <img alt="brand" src={Logo} />
      <div className="addresse">
        <span className="title"> العنوان:</span>
        <span className="subtitle">45 شارع الحبيب بورقيبة ، الكولوسيوم ، المدرج. أ ، الطابق الثالث ، تونس العاصمة.</span>
      </div>
      <div className="addresse">
        <span className="title"> الهاتف:</span>
        <span className="subtitle">+216 22 250 738</span>
      </div>
      <div className="Brand">
        <span className="copyright"> كل الحقوق محفوظة©</span>
      </div>

      {/* <div className="Consulting">
          <span className="Categorie-title">استشارة</span>
          <Link to="/" className="Categorie">الرئيسية</Link>
          <Link to="/sign-up-pro" className="Categorie">انا محامي</Link>
          <span className="Categorie">استشارة كتابية</span>
          <span className="Categorie">استشارة سمعية بصرية</span>
        </div>
    
        <div className="Law">
          <span className="Categorie-title"> قانوني</span>
          <span className="Categorie">سياسة الخصوصية</span>
          <span className="Categorie">أسعارنا</span>
          <span className="Categorie">من نحن</span>
          <span className="Categorie">اتصل بنا</span>
        </div>
    
        <div className="Newsletter">
          <span>سجل في النشرة البريدية الخاصة</span>
          <input type="text" name="name" placeholder="عنوان البريد الإلكتروني" />
          <button type="submit">التسجيل</button>
        </div> */}
    </div>
  );
};

export default Footer;
