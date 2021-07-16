import React from 'react';
import {Link} from "react-router-dom"


const OrderConfirmation = () => {
    return (

          <div className="PayementError">
     
          <span> يرجى الضغط على زر <b>الدفع</b> لإتمام المعاملة </span>
          <div className="Payement">
            <Link to="/dashboard">
          <button className="ant-btn">الدفع</button></Link>
          <Link to="/dashboard"> <button className="ant-btn">العودة لقائمة الاختيارات</button></Link>
          </div>
          </div>
    )
}

export default OrderConfirmation
