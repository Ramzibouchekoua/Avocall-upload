import React from 'react';
import SectionOne from './Sections/section_one';
import SectionTwo from './Sections/section_two';
import SectionThree from './Sections/section_three';
import SectionFour from './Sections/section_four';
import SectionFive from './Sections/section_five';
import SectionSix from './Sections/section_six';
import SectionSeven from './Sections/section_seven';
import SectionEight from './Sections/section_eight';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const HomePage = () => (
  <div>
    <SectionOne />
    <div id="company">
      <h3>خدمات قانونية للمؤسسات الصغيرة المتوسطة والشركات الناشئة</h3>
      <p>
        نوفّر حلولًا قانونية متكاملة مخصّصة للمؤسسات الصغيرة والمتوسطة والستارتاب، تشمل استشارات قانونية دقيقة مبنية على فهم
        عميق لواقع الأعمال، وصياغة عقود مخصّصة تحمي مصالح شركتكم وتدعم علاقاتكم المهنية، إضافة إلى مرافقة كاملة في إجراءات
        الامتثال القانوني والتراخيص اللازمة وفق التشريعات المعمول بها. كما نساعدكم في جميع مراحل تأسيس الشركات، من اختيار
        الصيغة القانونية المناسبة إلى إعداد الوثائق الأساسية والانطلاق بشكل سليم. كل ذلك بهدف تمكينكم من تنمية مشروعكم بثقة،
        وتقليل المخاطر القانونية، والتركيز على النمو والابتكار دون تعقيدات.
      </p>
      <Link to="/contact?company=true">
        <button> اتصل بنا</button>
      </Link>
    </div>
    <SectionTwo />
    <SectionThree />
    <SectionFour />
    <SectionFive />
    <SectionSix />
    <SectionSeven />
    <SectionEight />
  </div>
);
export default HomePage;
