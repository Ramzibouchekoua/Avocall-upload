import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
const fields = [
  {
    index: 1,
    subtext: 'قانون الأسرة',
    text: 'زواج ، نفقة ، طلاق ، حضانة ، نسب ، ميراث ، وصيّة ، هبة ...',
    icon: 'family-child.png',
    articlelink: 'https://avocall.tn/droit-de-la-famille/',
  },
  {
    index: 2,
    subtext: 'حادث',
    text: 'حادث مرور ، تسرّب مياه ، حريق ، حادث شغل…',
    icon: 'alert-triangle.png',
    articlelink: 'https://avocall.tn/bibliotheque-juridique/les-accidents/',
  },
  {
    index: 3,
    subtext: 'إستخلاص دين',
    text: 'شيك ، كمبيالة ، إعتراف بدين ، دين تعاقدي …',
    icon: 'user-cash-scale-unbalance-1.png',
    articlelink: 'https://avocall.tn/bibliotheque-juridique/recouvrement-de-creances/',
  },
  {
    index: 4,
    subtext: 'قانون جزائي',
    text: 'تحيّل ، سرقة ، إعتداء جسدي ،  عنف ضد المرأة أو الطفل …',
    icon: 'army-sword-fight.png',
    articlelink: 'https://avocall.tn/bibliotheque-juridique/criminelle/',
  },
  {
    index: 5,
    subtext: 'قانون الشغل',
    text: 'إبرام عقد شغل  ، طرد ، إستقالة، حادث شغل ، ضمان إجتماعي…',
    icon: 'office-desk.png',
    articlelink: 'https://avocall.tn/droit-du-travail/',
  },
  {
    index: 6,
    subtext: 'قانون الأكرية',
    text: 'كراء (سكني ، تجاري) أصل تجاري (بيع ، كراء ، رهن ) …',
    icon: 'single-neutral-actions-home.png',
    articlelink: 'https://avocall.tn/droit-de-location-tunisie/',
  },
  {
    index: 7,
    subtext: 'قانون عقّاري',
    text: 'بيع ، وعد بيع ، رهن، التسجيل ، ترسيم الملكية، تحيين ، تخصيص...',
    icon: 'house-chimney-2.png',
    articlelink: 'https://avocall.tn/bibliotheque-juridique/droit-immobilier/',
  },
  {
    index: 8,
    subtext: 'نزاعات الجوار',
    text: 'إستحقاق الملكية ، حوز ، كف الشغب ، رفع المضرّة …',
    icon: 'team-meeting-chat.png',
    articlelink: 'https://avocall.tn/bibliotheque-juridique/conflits-de-quartier/',
  },
  {
    index: 9,
    subtext: 'قانون التأمين',
    text: 'تأمين المسؤولية المدنية ، التأمين على الحياة ، التأمين على المرض ، التأمين البري / البحري…',
    icon: 'task-list-add.png',
    articlelink: 'https://avocall.tn/bibliotheque-juridique/assurance/',
  },
  {
    index: 10,
    subtext: 'القانون البنكي',
    text: 'عقد قرض ، إعادة جدولة الديون ، حساب جاري، مسؤولية بنكيّة  ، عقلة …',
    icon: 'credit-card-give.png',
    articlelink: 'https://avocall.tn/bibliotheque-juridique/bank/',
  },
  {
    index: 11,
    subtext: 'القانون الجبائي',
    text: 'تصاريح ، مراجعة جبائية، توظيف إجباري  ، بطاقة إلزام…',
    icon: 'cash-shield.png',
    articlelink: 'https://avocall.tn/bibliotheque-juridique/entreprise/',
  },
  {
    index: 12,
    subtext: 'قانون الشركات التجارية',
    text: 'تأسيس شركة ، الترفيع في رأس المال  ، إنقاذ الشركات التي تمرّ بصعوبات إقتصادية …',
    icon: 'office-outdoors.png',
    articlelink: 'https://avocall.tn/bibliotheque-juridique/entreprise/',
  },
];

const section_four = () => {
  return (
    <div className="section-four">
      <div className="title">مجالات الإختصاص</div>
      <div className="subtitle">إستعن بمحامي مختصّ في أيّ مجال من المجالات القانونيّة التي تختارها </div>
      <div className="desc">
        <Row>
          {fields.map((e) => (
            <Col xs={24} md={8} lg={6} key={e.index}>
              <a href={e.articlelink} target="blank">
                <div className="desc_icon">
                  <img
                    src={require(`../../../assets/icons/${e.icon}`)}
                    alt={'Avocall - ' + ' استشارة قانونية  في ' + e.subtext}
                  />
                  <h3 className="desc_text">{e.subtext}</h3>
                  <h4 className="desc_subtitle">{e.text}</h4>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </div>
      <Link to="/sign-up">
        <button>التسجيل</button>
      </Link>
    </div>
  );
};

export default section_four;
