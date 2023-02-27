import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import Datatable from './Datatable';
import Users from './Datatable/users';

function AllUsers() {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/api/user/all', {
      headers: {
        'x-auth-token': localStorage.getItem('auth-token'),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function search(item) {
    if (item) {
      if (item[0]) {
        const colmuns = item[0] && Object.keys(item[0]);
        return data.filter((item) =>
          colmuns.some((colmun) => item.userId.email.toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
        );
      } else {
        return;
      }
    }
  }
  return (
    <div className="alluser">
      <span className="title">All Users</span>

      {/* <Search placeholder="User search" type="text" value={q} onChange={(e) => setQ(e.target.value)} enterButton /> */}
      <div className="table">
        <span className="bold">Name</span>
        <span className="bold">Created</span>
        <span className="bold">Email</span>
        <span className="bold">Role </span>
        <span className="bold">Wallet </span>
        <span className="bold">Verified </span>
      </div>
      <Users data={data} />
    </div>
  );
}

export default AllUsers;
