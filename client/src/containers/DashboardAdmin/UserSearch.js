import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Space } from 'antd';
import Datatable from './Datatable';



function UserSearch () {
    const { Search } = Input;
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    fetch('http://localhost:5000/api/admin/getAllConsultations?page=1&limit=10000', {
      headers: {
        'x-auth-token': localStorage.getItem('auth-token'),
      },
    })
    .then((response) => response.json())
    .then((res) => setData(res.consultations));
         
  },
  []);
  function search(item) {
      const colmuns = item[0] && Object.keys(item[0]);
      return data.filter((item)=> 
      colmuns.some(
          (colmun) => item.userId.email.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
      );
  }
  return (
 
 <div className='alluser'>
 <span className='title'>All Consultations</span>

  <Search placeholder="User search" type="text" value={q} onChange={(e) => setQ(e.target.value)}  enterButton />
 <div  className='table'>
       <span className='bold'>Title</span>
       <span className='bold'>Created</span>
       <span className='bold'>Date </span> 
       <span className='bold'>Description </span> 
       <span className='bold'>Field </span> 
       <span className='bold'>Type </span> 
       <span className='bold'>Updated at </span> 
       <span className='bold'>User Email</span> 
       <span className='bold'>Status </span> 
       
     </div>
      <Datatable data={search(data)} /> 
</div>

  );
}

export default UserSearch;
