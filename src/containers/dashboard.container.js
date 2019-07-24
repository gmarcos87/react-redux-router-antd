import React, { useState } from 'react';
import { Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;



export const DashboardContainer = ({footerText,  TopMenu, Menu, Children}) => {
    const [collapsed, setCollapse] = useState(0);

      const onCollapse = collapsed => {
        setCollapse(collapsed)
      };

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            { Menu? <Menu></Menu>: false }
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
          { TopMenu? <TopMenu/>: false }
          </Header>
          <Content style={{ margin: '0 16px' }}>
            { Children? <Children/>: false }
          </Content>
          <Footer style={{ textAlign: 'center' }}>{ footerText || "©2019"}</Footer>
        </Layout>
      </Layout>
    );
}
