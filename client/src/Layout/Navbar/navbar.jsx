/**
 *
 * Navbar
 *
 */

import React from "react";
import { Layout, Menu, Button, Dropdown } from "antd";
import { Link, useHistory } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";

const { Header } = Layout;
const menu = (
  <Menu>
    <Menu.Item key="1">ع</Menu.Item>
    <Menu.Item key="2">Fr</Menu.Item>
    <Menu.Item key="2">En</Menu.Item>
  </Menu>
);
const Navbar = () => {
  const history = useHistory();

  const register = () => {
    history.push("/sign-up");
  };
  const login = () => {
    history.push("/sign-in");
  };
  return (
    <Header className="header">
      <Link to="/" >
        <div className="logo" />
      </Link>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className="header_navmenu"
      >
        <Menu.Item key="1" className="header_navmenu_item">
          <Link to="/">الرئيسية</Link>
        </Menu.Item>
        <Menu.Item key="2">
         <a href="https://avocall.tn/bibliotheque-juridique/" >المكتبة القانونية</a>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/sign-up-pro">أنا محامي</Link>
        </Menu.Item>
      </Menu>
      <div className="action">
        <Button className="signup" onClick={register}>
          التسجيل
        </Button>
        <Button className="signin" onClick={login}>
          الدخول
        </Button>
        <Dropdown overlay={menu}>
          <Button className="lang">
            ع <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

Navbar.propTypes = {};

export default Navbar;
