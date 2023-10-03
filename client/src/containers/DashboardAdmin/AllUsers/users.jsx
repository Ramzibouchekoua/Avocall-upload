import React from 'react';

import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

export default function Users({ data }) {
  return (
    <div className="users">
      {data
        ? data.map((item) => (
            <div key={item.id} className="user">
              <span className="bold">{item.name}</span>
              <span className="bold">{moment(new Date(item.createdAt)).format('YYYY-MM-DD ')} </span>
              <span className="bold">{item.email}</span>
              <span className="bold">{item.role}</span>
              <span className="bold">{item.wallet}</span>
              <span className="bold">{item.status.isVerified ? <CloseCircleOutlined /> : <CheckCircleOutlined />}</span>
            </div>
          ))
        : null}
    </div>
  );
}
