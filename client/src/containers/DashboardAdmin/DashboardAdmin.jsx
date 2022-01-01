import React, { useState, useEffect } from "react";
import { List } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ar-tn';
import { set } from "mongoose";
import Consultation from "./allConsultations";
import UserSearch from "./UserSearch";


const DashboardAdmin = () => {


  return (
<div className="admin-dashboard">

<UserSearch />
<Consultation />
</div>
  )
};

export default DashboardAdmin;