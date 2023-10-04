const newConsultation = (consultation, avocats) => {
  const roomURL =
    consultation.type === 'text'
      ? `https://avocall.com//text-chat${consultation._id}`
      : `https://avocall.com//vid-page${consultation._id}`;
  return `
<div style="background: rgb(204,204,204); padding:20px">
<div style=' border : 2px solid #202f84; height:700px; width:500px;margin:auto ; padding :30px; background:white'>
  <h3>إستشارة جديدة</h3>
  <h5>العنوان: ${consultation.title}</h5>
  <h5>التصنيف: ${consultation.type}</h5>
  <h5>التفاصيل: ${consultation.description ? consultation.description : 'N/A'}</h5>
  <h5>التاريخ: ${consultation.date}</h5>
  <h5>الغرفة: ${roomURL}</h5>

  <div>
  <ul  id='avocat'>

  </ul>
</div>
  
  </a>
</div>
</div>
<script>
const avocat=document.querySelector('#avocat');
var node = document.createElement("LI");
var textnode = document.createTextNode("Water");       
avocat.appendChild(textnode); 
</script>
`;
};
export default newConsultation;
