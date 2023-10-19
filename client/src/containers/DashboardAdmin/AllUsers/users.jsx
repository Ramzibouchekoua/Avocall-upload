import React, { useEffect, useState } from 'react';

import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

function Users({ data, ascending, setData, setAscending }) {
  return (
    <div className="users">
      {data?.length > 0
        ? data?.map((item, i) => (
            <div key={i} className="user">
              <span className="bold">{item?.name}</span>
              <span className="bold">{item?.createdAt ? moment(new Date(item?.createdAt)).format('YYYY-MM-DD ') : ''}</span>
              <span className="bold">{item?.email}</span>
              <span className="bold">{item?.role}</span>
              <span className="bold">{item.phone ? item?.phone : 'N/A'}</span>
              <span className="bold">{item?.wallet}</span>
              <span className="bold">{item?.status?.isVerified ? <CloseCircleOutlined /> : <CheckCircleOutlined />}</span>
            </div>
          ))
        : ''}
    </div>
  );
}
export default Users;
