import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, message } from 'antd';
import { useLoginMutation, useRegisterMutation } from '../../store/requestApi';
import { login, logout } from '../../store/authSlice';
import './index.css'

export default function SubmitForm(props) {
  const { usernameValidator, passwordValidator, loginForm } = props

  const [registerQuery] = useRegisterMutation()
  const [loginQuery] = useLoginMutation()

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const source = location.state?.pathname || '/'

  const onFinish = async (value) => {
    if (loginForm) {
      const userInfo = await loginQuery(value)
      if (userInfo.data.code === 0) {
        message.success('Login success')
        navigate(source, { replace: true })
        dispatch(login({
          username: userInfo.data.data.username,
          role: userInfo.data.data.role
        }))
      } else {
        message.error(userInfo.data.msg)
      }
    } else {
      const registerInfo = await registerQuery(value)
      if (registerInfo.data.code === 0) {
        message.success('Register success')
        dispatch(logout())
        navigate('/login')
      } else {
        message.error(registerInfo.data.msg)
      }
    }
  };

  const { Option } = Select;


  return (
    <div className='login'>
      <header className='login-header'>
        <h1>News Delivery Management System</h1>
      </header>
      <section className='login-content'>
        <h2>{loginForm ? 'User Login' : 'User Register'}</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                validator: usernameValidator,
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                validator: passwordValidator,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          {loginForm ? <></> : <Form.Item
            name="confirmPassword"
            rules={[
              {
                validator: passwordValidator,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>}

          {loginForm ? <></> : <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a role"
              allowClear
            >
              <Option value="manager">Manager</Option>
              <Option value="area manager">Area Manager</Option>
              <Option value="area editor">Area Editor</Option>
            </Select>
          </Form.Item>}

          <Form.Item className='login-submit'>
            <Button type="primary" htmlType="submit" className="login-form-button" >
              {loginForm ? 'Log in' : 'Register'}
            </Button>
            Or <NavLink to={loginForm ? '/register' : '/login'}>{loginForm ? 'register' : 'login'} now!</NavLink>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}