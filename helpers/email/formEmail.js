const formEmail = (email, name, phone, description, type) =>
  `<div style="background: rgb(204,204,204); padding:20px">
<div style=' box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white;text-align:left'>
<h3>New formulaire has been submitted ${type} </h3>
 <h4> Name: ${name}</h4>
 <h4> Email: ${email}</h4>
<h4> phone: ${phone}</h4>
<h4> description: ${description}</h4>
</div>
</div>
`;
export default formEmail;
