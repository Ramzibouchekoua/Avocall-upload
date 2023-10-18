import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import Datatable from './AllUsers';
import Users from './users';
import axios from 'axios';

function AllUsers() {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    const apiUrl = process.env.REACT_APP_API_URL + '/api/user/all';

    axios
      .get(apiUrl, {
        headers: {
          'x-auth-token': localStorage.getItem('auth-token'),
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
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

  return (
    <div className="alluser">
      <span className="title">All Users</span>
      <Search placeholder="Email" type="text" value={q} onChange={(e) => setQ(e.target.value)} enterButton />
      <div className="table">
        <span className="bold">Name</span>
        <span className="bold">Created</span>
        <span className="bold">Email</span>
        <span className="bold">Role </span>
        <span className="bold">Phone </span>
        <span className="bold">Wallet </span>
        <span className="bold">Verified </span>
      </div>
      <Users data={search(data)} />
    </div>
  );
}

export default AllUsers;
