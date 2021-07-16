import React from 'react';
import User from '../../assets/images/User.png';
import chat from '../../assets/images/Videochat.PNG';
import check from '../../assets/icons/check_green.png';

const VideoNotReady = () => {
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
       <img src={check} alt=""/>
       <div>
       <span className="title">لقد تم حجز المكالمة الالكترونية بنجاح بتاريخ 20.09.2020 على الساعة  20:30</span>
<span className="text">سيتصل بك مستشارنا القانوني الكترونيا للاجابة على استفساراتك القانونية. لذا نلتمس منكم مراعات الموعد الالكتروني و الحرص على تواجدكم بالموقع بالوقت المحدد</span>
       </div>
     </div>
   <img src={chat} alt="chat"/>
   </div>
 </div>
    )
}

export default VideoNotReady
