import React, { useState, useEffect } from "react";

import 'moment/locale/ar-tn';

import Consultation from "./allConsultations";
import UserSearch from "./UserSearch";
import Wallet from "./updateConsultation";

const DashboardAdmin = () => {


  return (
<div className="admin-dashboard">

<UserSearch />
<Consultation />
<Wallet />
</div>
  )
};

export default DashboardAdmin;