import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useLoginMutation } from '../../store/requestApi';
import { login } from '../../store/authSlice';
import '../index.scss'

export default function Login() {
  // define input validation rule
  const validator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your Information'))
    } else {
      return Promise.resolve()
    }
  }

  // send login query & navigate to previous page
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginQuery] = useLoginMutation()
  const onFinish = async (value) => {
    const userInfo = await loginQuery(value)
    if (userInfo.data.code === 0) {
      message.success('Login success')
      navigate(-1, { replace: true })
      dispatch(login({
        username: userInfo.data.data.username,
        role: userInfo.data.data.role,
        area: userInfo.data.data.area
      }))
    } else {
      message.error(userInfo.data.msg)
    }
  };

  return (
    <div className='entry login'>
      <header className='entry-header'>
        <h1>News Delivery Management System</h1>
      </header>
      <section className='login-content'>
        <h2>User Login</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item name="username" rules={[{ validator }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ validator }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className='login-submit'>
            <Button type="primary" htmlType="submit" className="login-form-button" >Log in</Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}