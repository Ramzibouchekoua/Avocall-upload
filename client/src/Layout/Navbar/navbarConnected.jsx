/**
 *
 * Navbar
 *
 */

import React from "react";
import { Layout, Menu, Popover } from "antd";
import { Link } from "react-router-dom";
import { LoginOutlined, FileDoneOutlined } from "@ant-design/icons";


const { Header } = Layout;


const Navbar = ({ logout, userName }) => {
  return (
    <Header className="header">
      <Link to="/"  > <div className="logo" /></Link>

      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className="header_navmenu"
      >
        <Menu.Item key="1" className="header_navmenu_item">
          <Link to="/dashboard">الرئيسية</Link>
        </Menu.Item>
        <Menu.Item key="2">
         <a href="http://blog.avocall.com/" >المكتبة القانونية</a>
        </Menu.Item>
      </Menu>

      <div className="logout">
        <LoginOutlined onClick={logout} />
        <Link to="/profile" className="Name">{userName.name}</Link>

        <Popover content="عدد الاستشارات المتبقية" >
          <p className={userName.wallet>0?"wallet successWallet":"wallet failWallet"}>{userName.wallet} <FileDoneOutlined /></p>
        </Popover>,
      </div>
    </Header>
  );
};

Navbar.propTypes = {};

export default Navbar;
