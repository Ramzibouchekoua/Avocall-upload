import React from "react";
import { Result,Button } from "antd";
import {Link} from "react-router-dom"
const ServerError = () => {
  return (
    <Result
    className="error-result"
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Link to="/"><Button>الرئيسية</Button></Link>}
    />
  );
};

export default ServerError;
