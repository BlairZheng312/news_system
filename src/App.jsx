import React from 'react'
import { useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd';
import elementTable from './router/indexRouter'

export default function App() {
  const element = useRoutes(elementTable)

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#fbb215',
        },
      }}
    >
      {element}
    </ConfigProvider>
  )
}
