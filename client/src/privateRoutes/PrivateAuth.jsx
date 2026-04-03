import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../context/userContext';

const PrivateUser = ({ component: Component, role, ...rest }) => {
  const { userData } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !userData.token ? (
          <Component {...props} />
        ) : userData.user.role === 'USER' ? (
          <Redirect to="/checkout" />
        ) : userData.user.role === 'ADMIN' ? (
          <Redirect to="/DashboardAdmin" />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateUser;
