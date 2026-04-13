import React, { useEffect, useState } from 'react';

import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

function Datatable({ data, ascending, setData, setAscending }) {
  const [first, setfirst] = useState(data);

  useEffect(() => {
    dataSort();
  }, [ascending, data]);

  const dataSort = () => {
    const source = Array.isArray(data) ? [...data] : [];

    if (ascending) {
      source.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      source.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    setfirst(source);
  };

  return (
    <div className="users">
      <table>
        <tbody>
          {first?.map((item, i) => (
            <tr key={i} className="user">
              <td className="email">{item?.userId?.email}</td>
              <td className="bold">{item.title}</td>
              <td>{moment(new Date(item.createdAt)).format('YYYY-MM-DD ')}</td>
              <td>{moment(new Date(item.date)).format('YYYY-MM-DD  [at] HH:MM')}</td>
              <td>{item?.description ? item.description : 'N/A'}</td>
              <td>{item?.field ? item?.field : 'N/A'}</td>
              <td>{item?.type}</td>
              <td>{moment(new Date(item.updatedAt)).format('YYYY-MM-DD [at] HH:MM')}</td>
              <td>{item?.isClosed ? <CloseCircleOutlined /> : <CheckCircleOutlined />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Datatable;
