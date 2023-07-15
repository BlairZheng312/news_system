import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, theme } from 'antd';
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'

export default function NewsSandBox() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Content } = Layout;
  return (
    <Layout>
      <SideMenu />
      <Layout>
        <TopHeader />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflow:'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

