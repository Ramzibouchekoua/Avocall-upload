/**
 *
 * Navbar
 *
 */

import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import _ from "lodash"

const { Header } = Layout;

const MobileNavbar = ({ user = {}, logout }) => {
  const history = useHistory();
  const register = () => {
    history.push('/sign-up');
  };
  const login = () => {
    history.push('/sign-in');
  };
  const menu = (
    !_.isEmpty(user) ?
      user.role === "USER" ?
        //User Menu
        <Menu>
          <Menu.Item key="1">
            <Link to="/dashboard">الرئيسية</Link>
          </Menu.Item>
          <Menu.Item key="2">
           <a href="https://avocall.tn/bibliotheque-juridique/" >المكتبة القانونية</a>
          </Menu.Item>

          <Menu.Item key="3" className="signin" onClick={logout}>
            الخروج
          </Menu.Item>
        </Menu>
        //Pro Menu
        : <Menu>

          <Menu.Item key="1">
            <Link to="/dashboardPro">جدول المواعيد</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="https://calendly.com/app/scheduled_events/user/me" target="_blank" rel="noopener noreferrer">توقيت العمل</a>
          </Menu.Item>
          <Menu.Item key="3">
           <a href="https://avocall.tn/bibliotheque-juridique/" >المكتبة القانونية</a>
          </Menu.Item>

          <Menu.Item key="4" className="signin" onClick={logout}>
            الحروج
  </Menu.Item>
        </Menu>
      //Default Menu
      : <Menu>
        <Menu.Item key="1">
          <Link to="/">الرئيسية</Link>
        </Menu.Item>
        <Menu.Item key="2">
         <a href="https://avocall.tn/bibliotheque-juridique/" >المكتبة القانونية</a>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/sign-up-pro">أنا محامي</Link>
        </Menu.Item>
        <Menu.Item key="4" className="signup" onClick={register}>
          التسجيل
      </Menu.Item>
        <Menu.Item key="5" className="signin" onClick={login}>
          الدخول
      </Menu.Item>
      </Menu>
  );
  return (
    <Header className="header">
      <Link to="/" >
        <div className="logo" />
      </Link>
      <Dropdown overlay={menu} trigger={['click']}>
        <div className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <MenuOutlined />
        </div>
      </Dropdown>
    </Header>
  );
};

export default MobileNavbar;
