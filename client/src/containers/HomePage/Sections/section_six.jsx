import React from "react";
import { Card } from "antd";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
const prices = [
  {
    index: 1,
    subtext: "إستشارة",
    text: "إستشارة  واحدة مكتوبة أو بالفيديو لمدة 20 دقيقة مع محامي مختصّ",
    price: "<span> 29</span> دت/إستشارة",
    featured: false,
  },
  {
    index: 2,
    subtext: "عرض :  3 إستشارات",
    text:
      "3 إستشارات مكتوبة أو بالفيديو  لمدة 20 دقيقة مع محامين مختصّين.العرض يبقى صالح لمدة سنة.",
    price: "<span> 69</span> دت/3 إستشارات",
    featured: true,
  },
  {
    index: 3,
    subtext: "عرض : على القياس",
    text:
      "ماذا تحتاج؟ مستخدمين متعددين؟ حزمة مكالمات مخصصة؟ يمكننا أن نوفر لكم عرضا على قياسكم",
    price: "",
    featured: false,
    custom: true,
  },
];
const section_six = () => {
  return (
    <div className="section-six">
      {prices.map((e) => (
        <Card key={e.index}>
          <div className="desc">
            {e.featured && <button className="featured-btn">منصوح به</button>}
            <div className="desc_text">{e.subtext}</div>
            {e.custom || (
              <div className="desc_price">{ReactHtmlParser(e.price)}</div>
            )}
            <div className="desc_subtitle">{e.text}</div>
            <Link to="/sign-up">
              <button className="sub-btn">التسجيل</button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default section_six;
