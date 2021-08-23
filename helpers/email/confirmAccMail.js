const confirmAccMail = (to, name, token) =>
  `<div style="background: rgb(204,204,204); padding:20px">
<div style=' box-shadow: 0 0 0.5cm rgba(0,0,0,0.5); width:500px;margin:auto ; padding :30px; background:white;text-align:right'>
  <h2> <span style=" text-transform: capitalize;"> ${name}</span> مرحبا بك</h2>
 <h3> لقد تم تفعيل حسابك بنجاح </h3>
 <h3> للتأكّد من إتمام إثبات ملكية حسابك، يُرجى الضغط على الزر ادناه</h3>
  <a href="http://51.38.225.27/:5000/api/user/verifMail/${token}" style='text-decoration:none; '>
  <button style='background-color:#202F84; color:white;font-weight:900;font-size:20px;padding:5px 30px;margin-top:20px;'> التاكيد الان </button>
  </a>
</div>
</div>
`;
export default confirmAccMail;
