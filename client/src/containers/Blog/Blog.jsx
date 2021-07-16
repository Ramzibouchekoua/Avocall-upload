import React from 'react';
import { Link } from "react-router-dom";
import office from "../../assets/icons/office-desk.png";
import family from "../../assets/icons/family-child.png";

const Blog = () => {
    return (
 <div className="Blog">
 <span>مرحبا بك في مكتبة الاستشارات</span>
<div className="Article"> 
<Link to="/قانون الأُسرة" >
 <div>
 <img alt="قانون الأُسرة" src={family} />
 <h2>قانون الأُسرة</h2>
 </div>
</Link>
<Link to="/قانون الأُسرة" >
<div>
<img alt="قــــــــــانون الشغل  " src={office} />
 <h2> قــــــــــانون الشغل  </h2>
</div>
</Link>
</div>
 </div>
    )
}

export default Blog
