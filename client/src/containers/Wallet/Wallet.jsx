import React from "react";
import { Layout, Menu, Popover } from "antd";
import { Link } from "react-router-dom";
import { LoginOutlined, FileDoneOutlined } from "@ant-design/icons";


const wallet = ({ logout, userName }) => {
    return (
        <div className="logout">
        
        <Link to="/profile" className="Name">{userName.name}</Link>

        <Popover content="عدد الاستشارات المتبقية" >
          <p className={userName.wallet>0?"wallet successWallet":"wallet failWallet"}>{userName.wallet} <FileDoneOutlined /></p>
        </Popover>,
      </div>
    )
}

export default wallet



