import React from 'react';
import Map from '../../assets/icons/4831018_direction_location_map_maps_pin_icon.svg';
import Hours from '../../assets/icons/6457560_24 hours_24_7_customer_delivery_service_icon.svg';
import Phone from '../../assets/icons/4014702_call_phone_service_support_icon (1).svg';

// import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div className="footer">
      <div className="information">
        <div>
          <img src={Map} alt="العنوان" />
          <a href="https://www.google.com/maps/place/Avocall/@36.8001901,10.1815148,15z/data=!4m2!3m1!1s0x0:0x4fc6a111ac1f09c2?sa=X&ved=2ahUKEwj-1s-Uuq70AhXJ-aQKHUhYALcQ_BJ6BAg9EAU">
            <span className="bold">العنوان</span>
            <span className="description">اقامة الكوليزي مدرج ا الطابق الثالث 45 شارع الحبيب بورقيبة تونس</span>
          </a>
        </div>

        <div>
          <img src={Hours} alt="توقيت العمل" />
          <a href="">
            <span className="bold">توقيت العمل</span>
            <span className="description">نحن متواجدون 24/7</span>
          </a>
        </div>

        <div>
          <img src={Phone} alt="رقم الهاتف" />
          <a href="tel:+21622250738">
            <span className="bold"> رقم الهاتف </span>
            <span className="description " dir="ltr">
              +216 22 250 738
            </span>
          </a>
        </div>
      </div>
      <div className="powred ">
        <span>Copyright © 2023 Avocall</span>
        <span>Powered by WK-Intelligence</span>
      </div>
    </div>
  );
};

export default Footer;
