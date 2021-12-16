import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AutoComplete } from 'antd';


function AllUser() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  });
  return (
    <div className='alluser'>
      <span className='title'>All Users</span>
      <div  className='table'>
            <span className='bold'>Username Name</span>
            <span className='bold'>Email</span>
            <span className='bold'>Phone Number </span>
  
          </div>
      <div className='users'>
        {users.map((item) => (
          <div key={item.id} className='user'>
            <span className='bold'>{item.username} {item.name}</span>
            <span className='bold'>{item.email}</span>
            <span className='bold'>{item.phone}</span>
  
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUser;
