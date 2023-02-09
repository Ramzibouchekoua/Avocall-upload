import React from 'react';
import moment from 'moment';

export default function Datatable({ data }) {
  return (
    <div className="users">
      {data.map((item) => (
        <div key={item.id} className="user">
          <span className="bold">{item.fileName}</span>

          <span className="bold"> {moment(new Date(item.createdAt)).format('YYYY-MM-DD')} </span>
        </div>
      ))}
    </div>
  );
}
