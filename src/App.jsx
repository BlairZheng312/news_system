import React from 'react'
import { useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import useAutoLogout from './hooks/useAutoLogout';
import useIndexRouter from './hooks/useIndexRouter';

export default function App() {
  const elementTable = useIndexRouter()
  const element = useRoutes(elementTable)
  useAutoLogout()
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fbb215',
        },
        components: {
          Button: {
            colorLinkHover: '#ef3c00d8',
            colorLink: '#fbb215',
          }
        }
      }}
    >
      {element}
    </ConfigProvider>
  )
}
