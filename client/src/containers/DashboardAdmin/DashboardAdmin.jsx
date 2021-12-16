import React, { useState, useEffect } from "react";
import { List } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import 'moment/locale/ar-tn';
import { set } from "mongoose";
import AllUser from "./AllUser";
import UserSearch from "./UserSearch";


const DashboardAdmin = () => {


  return (
<div className="admin-dashboard">

<UserSearch />
</div>
  )
};

export default DashboardAdmin;