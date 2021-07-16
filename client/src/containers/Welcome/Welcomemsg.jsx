import React from 'react';
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';


const Welcomemsg = () => {
    return (
  <div className="welcome-msg">
    <Result
    icon={<SmileOutlined />}
    title= {<span>نحن بصدد دراسة ملفكم <br/>  سوف نتصل بكم قريبا</span>}
  />
    
  </div>
    )
}

export default Welcomemsg
