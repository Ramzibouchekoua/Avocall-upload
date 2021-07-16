import React from "react";
import { Result,Button } from "antd";
import {Link} from "react-router-dom"
const UnAuthorized = () => {
  return (
    <Result
    className="error-result"
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Link to="/"><Button>الرئيسية</Button></Link>}
    />
  );
};

export default UnAuthorized;
