import React, { useState, useEffect } from "react";
import { List } from "antd";
import { EditOutlined, CreditCardOutlined, SolutionOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import 'moment/locale/ar-tn';
import Posts from "./Consultation";
import { Input, Space } from 'antd';



const Consultation = () => {
  const { Search } = Input;
  const [data, setData] = useState([]);
  const [q, setQ] = useState("");
  useEffect(() => {
      fetch('http://localhost:5000/api/admin/getAllPayments?page=1&limit=10000', {
        headers: {
          'x-auth-token': localStorage.getItem('auth-token'),
        },
      })
      .then((response) => response.json())
      .then((res) => setData(res.payments));
      
    },
    []);
    
 function search(item) {
 const colmuns = item[0] && Object.keys(item[0]);
  return data.filter((item)=> 
  colmuns.some(
      () => item.createdAt.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
  )
  );
}
 
return (  
  <div className='alluser'>
  <span className='title'>Consultation</span>
 
  <Search placeholder="Search by date" type="text" value={q} onChange={(e) => setQ(e.target.value)}  enterButton />
  <div  className='table'>
        <span className='bold'>File name</span>
        <span className='bold'>Date</span>
        
      </div>
     <Posts data={search(data)} />
      
 </div>
);
            }
export default Consultation;
