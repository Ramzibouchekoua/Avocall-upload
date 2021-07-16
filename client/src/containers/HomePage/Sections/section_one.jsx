import React from "react";
import { Link } from "react-router-dom";
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
          إطرح إشكاليّتك القانونيّة بصورة كتابيّة. تقع إجابتك كتابيّا بصورة
          فوريّة من طرف محامي مختصّ في أيّ مجال من المجالات القانونيّة التي
          تختارها.
        </div>
        <Link to="/sign-up">
          {" "}
          <button>التسجيل</button>
        </Link>
      </div>
      <div className="part left">
        <div className="icon-container">
          <div className="icon"></div>
        </div>
        <div className="title">  إستشارة هاتفية أو بالفيديو</div>
        <div className="desc">
إتصل مباشرة بمحامي مختصّ عبر الهاتف أو بالفيديو عبر المنصة الخاصة بنا 
لطرح إشكاليّتك القانونيّة و سوف تحصل على 
الإجابة فورا.
        </div>
        <Link to="/sign-up">
          <button>التسجيل </button>
        </Link>
      </div>
    </div>
  );
};

export default Section_one;
