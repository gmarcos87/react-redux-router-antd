import React, { useState } from 'react';
import { Layout, PageHeader } from 'antd';

import InkiriHeader from '@app/components/InkiriHeader';
// import { Header } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

//{ TopMenu? <TopMenu/>: <PageHeader title="Inkiri Bank" subTitle="Enjoy!" /> }

export const DashboardContainer = ({footerText,  TopMenu, Menu, Children}) => {
    const [collapsed, setCollapse] = useState(0);

      const onCollapse = collapsed => {
        setCollapse(collapsed)
      };

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            { Menu? <Menu/>: false }
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            { TopMenu? <TopMenu/>: <InkiriHeader /> }
          </Header>
          <Content style={{ margin: '0 16px' }}>
            { Children? <Children/>: false }
          </Content>
          <Footer style={{ textAlign: 'center' }}>{ footerText || "©2019"}</Footer>
        </Layout>
      </Layout>
    );
}
