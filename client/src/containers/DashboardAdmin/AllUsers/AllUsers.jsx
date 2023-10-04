import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import Datatable from './AllUsers';
import Users from './users';

function AllUsers() {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/api/user/all', {
      headers: {
        'x-auth-token': localStorage.getItem('auth-token'),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function search(item) {
    if (item[0]) {
      const colmuns = item[0] && Object.keys(item[0]);
      return data.filter((item) =>
        colmuns.some((colmun) => item.email.toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
      );
    } else {
      return '';
    }
  }
  const toggleSortOrder = () => {
    setAscending(!ascending);
  };
  return (
    <div className="alluser">
      <span className="title">All Users</span>
      <Search placeholder="Email" type="text" value={q} onChange={(e) => setQ(e.target.value)} enterButton />
      <button onClick={toggleSortOrder}>XX</button>{' '}
      <div className="table">
        <span className="bold">Name</span>
        <span className="bold">Created</span>
        <span className="bold">Email</span>
        <span className="bold">Role </span>
        <span className="bold">Wallet </span>
        <span className="bold">Verified </span>
      </div>
      <Users data={search(data)} />
    </div>
  );
}

export default AllUsers;
