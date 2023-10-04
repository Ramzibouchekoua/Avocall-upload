import React, { useEffect, useState } from 'react';

import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

function Users({ data, ascending, setData, setAscending }) {
  const [first, setfirst] = useState(data);
  useEffect(() => {
    dataSort();
  }, [ascending]);
  const dataSort = () => {
    let x = [];
    if (ascending) {
      x = data?.sort((a, b) => new moment(a.createdAt).format('YYYYMMDD') - new moment(b.createdAt).format('YYYYMMDD'));
    } else {
      x = data?.sort((a, b) => new moment(b.createdAt).format('YYYYMMDD') - new moment(a.createdAt).format('YYYYMMDD'));
    }
    setfirst(x);
  };
  return (
    <div className="users">
      {data.map((item) => (
        <div key={item.id} className="user">
          <span className="bold">{item?.name}</span>
          <span className="bold">{moment(new Date(item?.createdAt)).format('YYYY-MM-DD ')} </span>
          <span className="bold">{item?.email}</span>
          <span className="bold">{item?.role}</span>
          <span className="bold">{item?.wallet}</span>
          <span className="bold">{item?.status?.isVerified ? <CloseCircleOutlined /> : <CheckCircleOutlined />}</span>
        </div>
      ))}
    </div>
  );
}
export default Users;
