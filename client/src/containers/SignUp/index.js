import React from "react";
import SignupWrapper from "./SignUp"
import SignupProWrapper from "./SignUpPro"
const Signup = (props) => {
  return props.isPro?<SignupProWrapper {...props} />:<SignupWrapper {...props} />;
};

export default Signup;
