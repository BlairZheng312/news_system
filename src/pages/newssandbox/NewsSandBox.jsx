import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd';
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { useSelector } from 'react-redux';
import './index.scss'

export default function NewsSandBox() {
  const { Content } = Layout;

  const loading = useSelector(state => state.loading)

  return (
    <Layout>
      <SideMenu />
      <Layout>
        <TopHeader />
        <Content className='content'>
          <Spin size='large' spinning={loading.loadingStatus}>
            <Outlet />
          </Spin>
        </Content>
      </Layout>
    </Layout>
  )
}

