import React, { useState, useEffect } from 'react';
import 'moment/locale/ar-tn';
import Consultation from './allConsultations';
import UserSearch from './UserSearch';
import Wallet from './updateConsultation';
import AllUsers from './AllUsers';
import DataTable from './NewDataTable';

const DashboardAdmin = () => {
  useEffect(() => {
    mappedData();
  }, []);

  const Head = ['test1', 'test2', 'test3'];
  const Body = [
    { a: 'test1', b: 'test1', c: 'test1' },
    { a: 'test2', b: 'test2', c: 'test2' },
    { a: 'test1', b: 'test1', c: 'test1' },
  ];
  let Data = [];
  const mappedData = () =>
    Body.map((object) => {
      // Use Object.keys() to get an array of keys for each object
      const keys = Object.values(object);

      Data.push(keys);
    });
  return (
    <div className="admin-dashboard">
      {/* <UserSearch /> */}
      <Consultation />
      <AllUsers />
      <Wallet />
      <DataTable tableHead={Head} tableBody={Data} />
      {console.log(Data)}
    </div>
  );
};

export default DashboardAdmin;
