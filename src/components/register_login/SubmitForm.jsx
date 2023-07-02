import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { useLoginMutation, useRegisterMutation } from '../../store/requestApi';
import './index.css'

export default function SubmitForm(props) {
  const { usernameValidator, passwordValidator, login } = props

  const [registerQuery] = useRegisterMutation()
  const [loginQuery] = useLoginMutation()

  const navigate = useNavigate()

  const onFinish = async (value) => {
    if (login) {
      const userInfo = await loginQuery(value)
      if (userInfo.data.code === 0) {
        navigate('/home')
      } else {
        console.log('login fail')
      }
    } else {
      const registerInfo = await registerQuery(value)
      if (registerInfo.data.code === 0) {
        console.log('register sucess')
        navigate('/login')
      } else {
        console.log('register fail')
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
        <h2>{login ? 'User Login' : 'User Register'}</h2>
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

          {login ? <></> : <Form.Item
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

          {login ? <></> : <Form.Item
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
              {login ? 'Log in' : 'Register'}
            </Button>
            Or <NavLink to={login ? '/register' : '/login'}>{login ? 'register' : 'login'} now!</NavLink>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}