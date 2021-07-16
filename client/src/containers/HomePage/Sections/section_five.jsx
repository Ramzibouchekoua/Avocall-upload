import React, { useState } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
const testimonials = [
  {
    index: 1,
    subtext: "ابراهيم رمضان — موظف حكومي",
    text:
      "إتّصل بمحامٍ مختصّ في أيّ مجال من المجالات القانونيّة لطرح إشكاليّتك. يمكنك طرح إشكاليّتك القانونيّة : إمّا بصورة كتابيّة أو عبر الهاتف.",
    icon: "test1.jpg",
    show: true,
  },
  {
    index: 2,
    subtext: "ابراهيم رمضان — موظف حكومي",
    text:
      "إتّصل بمحامٍ مختصّ في أيّ مجال من المجالات القانونيّة لطرح إشكاليّتك. يمكنك طرح إشكاليّتك القانونيّة : إمّا بصورة كتابيّة أو عبر الهاتف.",
    icon: "test2.jpg",
    show: false,
  },
  {
    index: 3,
    subtext: "ابراهيم رمضان — موظف حكومي",
    text:
      "إتّصل بمحامٍ مختصّ في أيّ مجال من المجالات القانونيّة لطرح إشكاليّتك. يمكنك طرح إشكاليّتك القانونيّة : إمّا بصورة كتابيّة أو عبر الهاتف.",
    icon: "test3.jpg",
    show: false,
  },
  {
    index: 4,
    subtext: "ابراهيم رمضان — موظف حكومي",
    text:
      "إتّصل بمحامٍ مختصّ في أيّ مجال من المجالات القانونيّة لطرح إشكاليّتك. يمكنك طرح إشكاليّتك القانونيّة : إمّا بصورة كتابيّة أو عبر الهاتف.",
    icon: "test4.jpg",
    show: false,
  },
  {
    index: 5,
    subtext: "ابراهيم رمضان — موظف حكومي",
    text:
      "إتّصل بمحامٍ مختصّ في أيّ مجال من المجالات القانونيّة لطرح إشكاليّتك. يمكنك طرح إشكاليّتك القانونيّة : إمّا بصورة كتابيّة أو عبر الهاتف.",
    icon: "test5.jpg",
    show: false,
  },
];
const SectionFive = () => {
  const [active, setActive] = useState(0);
  const changeSpeaker = (e) => {
    setActive(e);
  };
  return (
    <div className="section-five">
      <div className="title">قالوا عنا</div>
      <div className="subtitle">
        إستعن بمحامي مختصّ في أيّ مجال من المجالات القانونيّة التي تختارها
      </div>
      <div className="other-people">
        {testimonials
          .filter((el) => !el.show)
          .map((e) => (
            <img
              key={e.index}
              src={require(`../../../assets/images/people/${e.icon}`)}
              alt=""
              onClick={() => changeSpeaker(e.index - 1)}
            />
          ))}
      </div>
      <Row>
        <Col xs={24} md={12} lg={6} key={testimonials[active].index}>
          <div className="desc">
            <div className="desc_icon">
              <img
                src={require(`../../../assets/images/people/${testimonials[active].icon}`)}
                alt="testimonials"
              />
            </div>
            <div className="desc_subtitle">{testimonials[active].text}</div>
            <div className="desc_text">{testimonials[active].subtext}</div>
          </div>
        </Col>
      </Row>
      <Link to="/sign-up">
        <button>التسجيل</button>
      </Link>
    </div>
  );
};

export default SectionFive;
