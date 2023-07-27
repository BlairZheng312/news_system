import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, theme, Spin } from 'antd';
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { useSelector } from 'react-redux';

export default function NewsSandBox() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Content } = Layout;

  const loading = useSelector(state=>state.loading)
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
            overflow: 'auto'
          }}
        >
          <Spin size='large' spinning={loading.loadingStatus}>
            <Outlet />
          </Spin>
        </Content>
      </Layout>
    </Layout>
  )
}

