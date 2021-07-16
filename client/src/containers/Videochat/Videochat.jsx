import React from 'react';
import User from '../../assets/images/User.png';
import chat from '../../assets/images/chat_vid.PNG';

const Videochat = () => {
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
   <div className="chat">
   <img src={chat} alt="chat"/>
   </div>
 </div>
    )
}

export default Videochat
