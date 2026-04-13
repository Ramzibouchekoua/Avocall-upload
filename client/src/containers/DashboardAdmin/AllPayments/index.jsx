import React from 'react';
import moment from 'moment';

export default function Datatable({ data, onAction }) {
  return (
    <div className="users">
      {data.map((item) => (
        <div key={item._id} className="user">
          <span className="bold">{item.user ? item.user.email : '-'}</span>
          <span className="bold">{item.packCode}</span>
          <span className="bold">{item.status}</span>
          <span className="bold"> {moment(new Date(item.createdAt)).format('YYYY-MM-DD')} </span>
          <div>
            {item.paymentMethod === 'BANK_TRANSFER' && item.status === 'PENDING_REVIEW' ? (
              <>
                <button className="ant-btn" onClick={() => onAction(item._id, 'approve')}>
                  Approve
                </button>
                <button className="ant-btn" onClick={() => onAction(item._id, 'reject')}>
                  Reject
                </button>
              </>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
