import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../context/userContext";

const PrivateUser = ({ component: Component, role, ...rest }) => {
  const { userData } = useContext(UserContext);

  return (
    <Route {...rest} render={(props) =>
      userData.token ?
        userData.user.role === "PRO" ?
          <Component {...props} />
          : <Redirect to="/unauthorized" />
        : <Redirect to="/sign-in" />
    }
    />
  );
};

export default PrivateUser;
