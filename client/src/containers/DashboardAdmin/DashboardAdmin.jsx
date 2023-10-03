import React, { useState, useEffect } from 'react';
import 'moment/locale/ar-tn';
import AllPayements from './AllPayments/allConsultations';
import AllConsultations from './AllConsultations/UserSearch';
import Wallet from './AddConsultations/updateConsultation';
import AllUsers from './AllConsultations/UserSearch';
import FileAttached from './FileAttached';
import { Input, Space } from 'antd';

const DashboardAdmin = () => {
  const { SearchInp } = Input;
  const [filtredData, setFiltredData] = useState('');
  const [data, setData] = useState([]);

  function search(item) {
    const colmuns = item[0] && Object.keys(item[0]);
    return data.filter((item) =>
      colmuns.some(() => item.createdAt.toString().toLowerCase().indexOf(data.toLowerCase()) > -1)
    );
  }

  return (
    <div className="admin-dashboard">
      <AllConsultations />
      <AllPayements />
      <AllUsers />
      <Wallet />
      <FileAttached />
    </div>
  );
};

export default DashboardAdmin;
