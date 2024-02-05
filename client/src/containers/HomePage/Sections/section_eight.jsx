import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Section_eight = () => {
  return (
    <div className="section-eight">
      <span>للاتصال بنا اضغط على الرابط أدناه</span>
      <Link to="/contact">
        <button> اتصل بنا</button>
      </Link>
    </div>
  );
};

export default Section_eight;
