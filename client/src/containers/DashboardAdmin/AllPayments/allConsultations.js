import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'moment/locale/ar-tn';
import Posts from '.';
import { Input, Select } from 'antd';

const Consultation = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const statusQuery = status ? `&status=${status}` : '';

    axios
      .get(process.env.REACT_APP_API_URL + '/api/admin/getAllPayments?page=1&limit=10000' + statusQuery, {
        headers: {
          'x-auth-token': localStorage.getItem('auth-token'),
        },
      })
      .then((res) => setData(res.data.payments));
  }, [status]);

  function search() {
    return data.filter((entry) => {
      const createdAt = entry.createdAt ? entry.createdAt.toString().toLowerCase() : '';
      const email = entry.user && entry.user.email ? entry.user.email.toLowerCase() : '';
      const packCode = entry.packCode ? entry.packCode.toLowerCase() : '';

      return (
        createdAt.indexOf(q.toLowerCase()) > -1 ||
        email.indexOf(q.toLowerCase()) > -1 ||
        packCode.indexOf(q.toLowerCase()) > -1
      );
    });
  }

  const updatePayment = (paymentId, action) => {
    const endpoint = action === 'approve' ? 'approvePayment' : 'rejectPayment';

    axios
      .post(
        process.env.REACT_APP_API_URL + '/api/admin/' + endpoint + '/' + paymentId,
        {},
        {
          headers: {
            'x-auth-token': localStorage.getItem('auth-token'),
          },
        },
      )
      .then((res) => {
        setData((currentData) => currentData.map((item) => (item._id === paymentId ? res.data.payment || item : item)));
      });
  };

  return (
    <div className="alluser">
      <span className="title">All Payments</span>

      <div className="filters-bar ">
        <Search
          placeholder="Search by date, user email, or pack"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          enterButton
          className="filter-search"
        />
        <Select value={status} onChange={setStatus} className="filter-select" dropdownMatchSelectWidth>
          <Select.Option value="">All statuses</Select.Option>
          <Select.Option value="PENDING_REVIEW">Pending review</Select.Option>
          <Select.Option value="APPROVED">Approved</Select.Option>
          <Select.Option value="REJECTED">Rejected</Select.Option>
          <Select.Option value="PENDING_PROVIDER">Pending provider</Select.Option>
          <Select.Option value="AWAITING_VERIFICATION">Awaiting verification</Select.Option>
          <Select.Option value="FAILED">Failed</Select.Option>
        </Select>
        <button
          className="filter-clear"
          type="button"
          onClick={() => {
            setQ('');
            setStatus('');
          }}
        >
          Clear
        </button>
      </div>
      <div className="table">
        <span className="bold">User</span>
        <span className="bold">Pack</span>
        <span className="bold">Status</span>
        <span className="bold">Date</span>
        <span className="bold">Actions</span>
      </div>
      <Posts data={search()} setData={setData} onAction={updatePayment} />
    </div>
  );
};
export default Consultation;
