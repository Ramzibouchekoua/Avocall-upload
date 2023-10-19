import React, { useEffect, useState } from 'react';

function NewDataTable({ tableHead, tableBody }) {
  const [first, setfirst] = useState([]);

  useEffect(() => {
    let Data = [];
    tableBody?.map((object) => {
      const keys = Object.values(object);

      Data.push(keys);
    });
    setfirst(Data);
  }, [tableBody]);

  return (
    <div className="datatable">
      {first.length < 1 ? (
        <p className="alert-datatable">No Data</p>
      ) : (
        <table>
          <thead>
            <tr>
              {tableHead?.map((item) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {first.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NewDataTable;
