
import React from "react";

import {
  CloseCircleOutlined,
  CheckCircleOutlined
 
} from '@ant-design/icons';
import moment from "moment";

export default function Datatable({ data }) {

  return (
    <div className="users">
      {data.map((item) => (
        <div key={item.id} className="user">
          <span className="bold">{item.title}</span>
          <span className="bold">{moment(new Date(item.createdAt)).format('YYYY-MM-DD ')} </span>
          <span className="bold">{moment(new Date(item.date)).format('YYYY-MM-DD  [at] HH:MM')}</span>
          <span className="bold">{item.description}</span>
          <span className="bold">{item.field}</span>
          <span className="bold">{item.type}</span>
          <span className="bold">{moment(new Date(item.updatedAt)).format('YYYY-MM-DD HH:MM')}</span>
          <span className="bold">{item.userId.email}</span>
          <span className="bold">{item.name}</span>
          {/* <span className='bold'>{item.phone}</span> */}
          <span className="bold">{item.isClosed ? <CloseCircleOutlined /> : <CheckCircleOutlined /> }</span>
        </div>
      ))}
    </div>
  );
}
