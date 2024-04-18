import React, { useState } from 'react';
import 'moment/locale/ar-tn';
import AllPayements from './AllPayments/allConsultations';
import AllConsultations from './AllConsultations/UserSearch';
import Wallet from './AddConsultations/updateConsultation.jsx';
import AllUsers from './AllUsers/AllUsers';
import { Input } from 'antd';

const DashboardAdmin = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('All Consultations');

  function search(item) {
    const colmuns = item[0] && Object.keys(item[0]);
    return data.filter((item) =>
      colmuns.some(() => item.createdAt.toString().toLowerCase().indexOf(data.toLowerCase()) > -1)
    );
  }

  const MenuDashboard = () => {
    switch (value) {
      case 'All Payments':
        return <AllPayements />;
        break;
      case 'All Users':
        return <AllUsers />;
        break;
      case 'Add Consultation':
        return <Wallet />;
        break;
      default:
        return <AllConsultations />;
        break;
    }
  };
  return (
    <div className="admin-dashboard">
      <div className="menu-admin-dashboard">
        <button className={value === 'All Consultations' ? 'selected' : ''} onClick={() => setValue('All Consultations')}>
          {' '}
          All Consultations
        </button>
        <button className={value === 'All Payments' ? 'selected' : ''} onClick={() => setValue('All Payments')}>
          {' '}
          All Payments
        </button>
        <button className={value === 'All Users' ? 'selected' : ''} onClick={() => setValue('All Users')}>
          All Users{' '}
        </button>
        <button className={value === 'Add Consultation' ? 'selected' : ''} onClick={() => setValue('Add Consultation')}>
          Add Consultations{' '}
        </button>
      </div>
      <MenuDashboard />
      {/* <FileAttached /> */}
    </div>
  );
};

export default DashboardAdmin;
