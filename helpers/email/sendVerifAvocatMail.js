const verifEmailTemplate = (user, token) => `
<div style="background: rgb(204,204,204); padding:20px">
<div style=' box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white'>
  <h3><span style=" text-transform: capitalize;"> ${user.name}</span></h3>
  <h3><span style=" text-transform: capitalize;"> ${user.email}</span></h3>
  <h3><span style=" text-transform: capitalize;"> ${user.phone}</span></h3>
  <h3><span style=" text-transform: capitalize;"> ${user.address}</span></h3>
  <h3><span style=" text-transform: capitalize;"> ${user.type}</span></h3>
  <a href="http://localhost:5000/api/user/verifMail/${token}" >
  <button>Valid Account</button>
  
  </a>
</div>
</div>`;
export default verifEmailTemplate;