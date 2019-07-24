import React from 'react';
import { Layout } from 'antd';

export const BlankContainer = ({Children}) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
        { Children? <Children/>: <div/> }
      </Layout>
    );
}
