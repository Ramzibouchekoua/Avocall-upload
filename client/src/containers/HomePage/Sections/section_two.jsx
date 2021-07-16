import React from "react";
import { Link } from "react-router-dom";
const section_two = () => {
  return (
    <div className="section-two">
      <div className="title">
        إستشارة قانونية على الخطّ – فورًا لاتّخاذ القرار السّليم
      </div>
      <div className="desc">
        إتّصل بمحامٍ مختصّ في أيّ مجال من المجالات القانونيّة لطرح إشكاليّتك.
        يمكنك طرح إشكاليّتك القانونيّة : إمّا بصورة كتابيّة ، عبر الهاتف أو بالفيديو عبر المنصة الخاصة بنا تقع
        إجابتك بصورة فوريّة من طرف محامي مختصّ في أيّ مجال من المجالات
        القانونيّة التي تختارها. <br />شعارنا : السّرعة ، النّجاعة ، الشّفافيّة.
      </div>
      <Link to="/sign-up">
        <button>التسجيل</button>
      </Link>
    </div>
  );
};

export default section_two;
