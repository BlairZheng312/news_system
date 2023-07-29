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
          // color for the main theme (including primary button)
          colorPrimary: '#fbb215',

          // color for link & link hover
          colorLink: '#ef3c00d8',
          colorLinkHover: '#fbb215',

          // color for content layout
          colorBgLayout: 'black'
        },
        components: {
          Button: {
            // color for default button
            colorText: '#ef3c00d8',

            // color for link button (used in filter reset)
            colorLink: '#fbb215',
            colorLinkHover: '#ef3c00d8',
          }
        }
      }}
    >
      {element}
    </ConfigProvider>
  )
}
