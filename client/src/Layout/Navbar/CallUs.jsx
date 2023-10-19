import React from 'react';

function CallUs() {
  return (
    <div
      style={{
        width: '100%',
        padding: '10px 20px',
        color: '#000000',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        height: '40px',
        backgroundColor: '#28E781',
      }}
    >
      <p style={{ direction: 'rtl', fontWeight: 900, marginLeft: '10px', color: 'black' }}>اتصل بنا:</p>

      <a style={{ direction: 'ltr', fontWeight: 900, textDecoration: 'none', color: '#0000f' }} href="tel:+21622250738">
        +216 22 250 738
      </a>
    </div>
  );
}

export default CallUs;
