import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'moment/locale/ar-tn';
import Posts from '.';
import { Input } from 'antd';

const Consultation = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + '/api/admin/getAllPayments?page=1&limit=10000', {
        headers: {
          'x-auth-token': localStorage.getItem('auth-token'),
        },
      })
      .then((res) => setData(res.data.payments));
  }, []);

  function search(item) {
    const colmuns = item[0] && Object.keys(item[0]);
    return data.filter((item) => colmuns.some(() => item.createdAt.toString().toLowerCase().indexOf(q.toLowerCase()) > -1));
  }

  return (
    <div className="alluser">
      <span className="title">All payment</span>

      <Search placeholder="Search by date" type="text" value={q} onChange={(e) => setQ(e.target.value)} enterButton />
      <div className="table">
        <span className="bold">File name</span>
        <span className="bold">Date</span>
      </div>
      <Posts data={search(data)} setData={setData} />
    </div>
  );
};
export default Consultation;
