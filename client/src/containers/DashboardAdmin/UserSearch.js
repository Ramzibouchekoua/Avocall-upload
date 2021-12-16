import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Space } from 'antd';
import Datatable from './Datatable';



function UserSearch () {
    const { Search } = Input;
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  },[]);
  function search(item) {
      const colmuns = item[0] && Object.keys(item[0]);
      return data.filter((item)=> 
      colmuns.some(
          (colmun) => item[colmun].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
      );
  }
  return (
 
 <div className='alluser'>
 <span className='title'>All Users</span>

 <Search placeholder="User search" type="text" value={q} onChange={(e) => setQ(e.target.value)}  enterButton />
 <div  className='table'>
       <span className='bold'>Username Name</span>
       <span className='bold'>Email</span>
       <span className='bold'>Phone Number </span>
       
     </div>
     <Datatable data={search(data)} />
</div>

  );
}

export default UserSearch;
