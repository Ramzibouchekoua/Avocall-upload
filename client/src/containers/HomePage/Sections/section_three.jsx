import React from 'react';
import { Row, Col } from 'antd';
const steps = [
  {
    index: 1,
    subtitle: 'التسجيل مجاني ',
    text: 'قم بإنشاء حسابك بصورة مجانية حتّى تتمكن من الولوج إلى المنصّة',
    icon: 'touch-id-approved-1.png',
  },
  {
    index: 2,
    subtitle: 'إختيار نوع الإستشارة ',
    text: 'إختر نوع الإستشارة القانونية التي تريد إجراءها على موقعنا',
    icon: 'seo-search.png',
  },
  {
    index: 3,
    subtitle: 'الدفع',
    text: 'إدفع معلوم الإستشارة بصورة آمنة',
    icon: 'money-wallet.png',
  },
  {
    index: 4,
    subtitle: 'الإستشارة',
    text: 'تحصل على استشارة قانونية (مكتوبة أو صوتية ) من طرف محامي مختصّ. ',
    icon: 'user-question.png',
  },
];
const section_three = () => {
  return (
    <div className="section-three">
      <div className="title">كيف نعمل؟</div>
      <Row>
        {steps.map(e => (
          <Col xs={24} md={12} lg={6} key={e.index}>
            <div className="desc">
              <div className="desc_icon">
                <div className="desc_icon_steps" > {e.index} </div>
                <img
                  src={require(`../../../assets/images/${e.icon}`)}
                  alt=""
                />
              </div>
              <div className="desc_subtitle">{e.subtitle}</div>
              <div className="desc_text">{e.text}</div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default section_three;
