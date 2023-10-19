import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import Datatable from './index';

function UserSearch() {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [ascending, setAscending] = useState(true);
  const [q, setQ] = useState('');

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/api/user/all', {
      headers: {
        'x-auth-token': localStorage.getItem('auth-token'),
      },
    })
      .then((response) => response.json())
      .then((res) => {})
      .catch((err) => {});
    fetch(process.env.REACT_APP_API_URL + '/api/admin/getAllConsultations?page=1&limit=10000', {
      headers: {
        'x-auth-token': localStorage.getItem('auth-token'),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res.consultations);
      })
      .catch((err) => {});
  }, []);
  function search(item) {
    if (item[0]) {
      const colmuns = item[0] && Object.keys(item[0]);
      return data.filter((item) =>
        colmuns.some((colmun) => item.userId.email.toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
      );
    } else {
      return;
    }
  }
  const toggleSortOrder = () => {
    setAscending(!ascending);
  };

  return (
    <div className="alluser">
      <span className="title">All Consultations</span>
      <Search placeholder="User search" type="text" value={q} onChange={(e) => setQ(e.target.value)} enterButton />
      <button onClick={toggleSortOrder} className="sort-button">
        {ascending ? 'A' : 'D'}
      </button>{' '}
      <div className="table">
        <span className="bold email">User Email</span>
        <span className="bold">Title</span>
        <span className="bold">Created</span>
        <span className="bold">Date </span>
        <span className="bold">Description </span>
        <span className="bold">Field </span>
        <span className="bold">Type </span>
        <span className="bold">Updated at </span>
        <span className="bold">Status </span>
      </div>
      {data.length < 1 ? (
        <p className="alert-datatable">No Data</p>
      ) : (
        <Datatable data={search(data)} setAscending={setAscending} ascending={ascending} setData={setData} />
      )}
    </div>
  );
}

export default UserSearch;
