const buyPackEmail = user => {
  return `
  <div style="background: rgb(204,204,204); padding:20px">
  <div style=' box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white'>
    <h3>التحقق من الدفع</h3>
    <h5>المستعمل: ${user.name}</h5>
    <h5>البريد الإلكتروني: ${user.email}</h5>
  </div>
  </div>
  `;
};
export default buyPackEmail;
