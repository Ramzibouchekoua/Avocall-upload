import React, { useState } from 'react';
import 'moment/locale/ar-tn';
import AllPayements from './AllPayments/allConsultations';
import AllConsultations from './AllConsultations/UserSearch';
import Wallet from './AddConsultations/updateConsultation.jsx';
import AllUsers from './AllUsers/AllUsers';

const TAB_KEYS = {
  CONSULTATIONS: 'consultations',
  PAYMENTS: 'payments',
  USERS: 'users',
  ADD_CONSULTATION: 'add-consultation',
};

const TABS = [
  { key: TAB_KEYS.CONSULTATIONS, label: 'Consultations' },
  { key: TAB_KEYS.PAYMENTS, label: 'Payments' },
  { key: TAB_KEYS.USERS, label: 'Users' },
  { key: TAB_KEYS.ADD_CONSULTATION, label: 'Add Wallet Credit' },
];

const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState(TAB_KEYS.CONSULTATIONS);

  const tabContentMap = {
    [TAB_KEYS.CONSULTATIONS]: <AllConsultations />,
    [TAB_KEYS.PAYMENTS]: <AllPayements />,
    [TAB_KEYS.USERS]: <AllUsers />,
    [TAB_KEYS.ADD_CONSULTATION]: <Wallet />,
  };

  const activeContent = tabContentMap[activeTab] || <AllConsultations />;

  return (
    <div className="admin-dashboard">
      <div className="menu-admin-dashboard">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? 'selected tab-button' : 'tab-button'}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeContent}
      {/* <FileAttached /> */}
    </div>
  );
};

export default DashboardAdmin;
