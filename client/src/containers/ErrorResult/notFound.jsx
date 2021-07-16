import React from "react";
import { Result,Button } from "antd";
import {Link} from "react-router-dom"
const NotFound = () => {
  return (
    <Result
    className="error-result"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Link to="/"><Button>الرئيسية</Button></Link>}
    />
  );
};

export default NotFound;
