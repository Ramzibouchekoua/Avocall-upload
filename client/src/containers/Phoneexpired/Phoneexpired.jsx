import React from 'react';
import User from '../../assets/images/User.png';


const Phoneexpired = () => {
    return (
 <div className="Text-chat">
   <div className="Table">
<table className="az">
  <tbody>
  <tr>
    <th>  استشارة سمعية بصرية</th>
  </tr>
  <tr><td>استشارة بخصوص حقوق ملكية فكرية</td></tr>
  </tbody>

<tbody>
  
<tr>
    <th> التاريخ</th>
  </tr>
  <tr><td>   20.10.2020</td></tr>
</tbody>

 <tbody>
 <tr>
    <th> الحالة</th>
  </tr>
  <tr><td>  مفتوحة</td></tr>
 </tbody>
<tbody>
<tr>
<div className="consultant">
<img src={User} alt="Consultant"/>
  <div>
  
    <th> المستشار القانوني</th> 
    <tr>  ابراهيم رمضان</tr>
  
 </div>
</div>
  
</tr>
</tbody>
 
</table>
<button className="button-blue">أغلق الاستشارة</button>
<button className="button-blue">تعديل الاستشارة</button>
<button className="Connexion ">مشكلة في الاستشارة ؟</button>
   </div>
   <div className="chats">
     <div className="message">
       <span className="title">لقد انتهت المكالمة الالكترونية بنجاح بتاريخ 20.09.2020 على الساعة  20:30</span>
<span className="text">اضغط على  <b>الرابط</b>  لحجز  استشارة  آخره</span>
     </div>
     <div className="Subject">
<span>تفاصيل الاستشارة</span>
<p>لا عذر لأحد في ترك المشورة وإن كان من أهل العقل والرشاد وذوي الرأي والسداد، فإنَّ المشاور قد يكون له في بعض الأمر هوى ولبعض الوجوه ميل، فلربما جنح إلى هواه ومال إلى غرضه، والمشاور إنما يُعطي لُباب عقله، وصفوة رأيه، وخالص نظره.

 

قال الزهري: كان مجلس عمر بن الخطاب رضي الله عنه مغتصاً من العلماء والقراء كهولاً وشباناً، فكان يقول: لا تمنع أحدكم حداثة سنه أن يشير برأيه، فإن الرأي ليس على حداثة السن ولا على قِدمه، ولكنه أمر يضعه الله حيث يشاء.

 

يقول الماوردي في كتابه (أدب الدنيا والدين): اعلم أنَّ من الحزم لكل ذي لُب، ألا يُبرم أمراً ولا يُمضي عزماً إلا بمشورة ذي الرأي الناصح، ومطالعة ذي العقل الراجح، فإن الله تعالى أمر بالمشورة نبيه صلى الله عليه وسلم، مع ما تكفل به من إرشاده، ووعد به من تأييده.


</p>
     </div>
  
   </div>
 </div>
    )
}

export default Phoneexpired
