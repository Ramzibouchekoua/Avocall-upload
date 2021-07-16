import React from 'react'
import { Layout} from 'antd';
import Header from "./Navbar";
import Footer from "./Footer";
const {  Content } = Layout;

const HomeLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header/>
        
      <Content >
        {children}
      </Content>
      
      <Footer />
    </Layout>
  )
}

export default HomeLayout
