import React from 'react';

export default function Datatable ({data}) {
    
    return (
   
         <div className='users'>
         {data.map((item) => (
           <div key={item.id} className='user'>
             <span className='bold'>{item.username} {item.name}</span>
             <span className='bold'>{item.email}</span>
             <span className='bold'>{item.phone}</span>
   
           </div>
         ))}
       </div>
    )
}
