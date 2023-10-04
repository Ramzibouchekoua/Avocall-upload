/**
 *
 * Navbar
 *
 */

import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = ({ logout, userName }) => {
  return (
    <Header className="header">
      <Link to="/">
        <div className="logo" />
      </Link>

      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} className="header_navmenu">
        <Menu.Item key="1">
          <Link to="/DashboardAdmin">لوحة القيادة</Link>
        </Menu.Item>
      </Menu>
      <div className="logout">
        <LoginOutlined onClick={logout} />
        <Link to="/profile">{userName}</Link>
      </div>
    </Header>
  );
};

Navbar.propTypes = {};

export default Navbar;
