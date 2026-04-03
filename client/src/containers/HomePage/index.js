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
      <h3>خدمات قانونية للمؤسسات الصغرة والمتوسطة و للشركات الناشئة</h3>
      <p>
        نوفّر لكم حلولًا قانونية متكاملة مخصّصة للمؤسسات الصغرة والمتوسطة وللشركات الناشئة، تشمل استشارات قانونية متخصصة و
        دقيقة مبنية على فهم عميق لواقع الأعمال، وصياغة عقود خاصة تحمي مصالح شركتكم وتدعم علاقاتكم المهنية، إضافة إلى مرافقة
        كاملة للقيام بإجراءات سليمة لتكوين الشركات و الامتثال لجميع المستوجبات القانونية و للحصول، عند الإقتضاء، على التراخيص
        اللازمة وفق التشريع الجاري به العمل. كما نساعدكم على اختيار الصيغة القانونية المناسبة إلى إعداد الوثائق الأساسية
        والانطلاق بشكل سليم. كل ذلك بهدف تمكينكم من تنمية مشروعكم على أسس صحيحة، والحد من المخاطر القانونية، والتركيز على
        النمو والابتكار دون تعقيدات.
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
