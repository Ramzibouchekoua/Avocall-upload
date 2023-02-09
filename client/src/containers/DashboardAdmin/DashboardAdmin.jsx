import React, { useState, useEffect } from 'react';

import 'moment/locale/ar-tn';

import Consultation from './allConsultations';
import UserSearch from './UserSearch';
import Wallet from './updateConsultation';
import AllUsers from './AllUsers';

const DashboardAdmin = () => {
  return (
    <div className="admin-dashboard">
      <UserSearch />
      <Consultation />
      <AllUsers />
      <Wallet />
    </div>
  );
};

export default DashboardAdmin;
