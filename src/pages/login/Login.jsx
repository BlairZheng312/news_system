import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './index.css'

export default function Login() {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const inputValidator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your Information'))
    } else if (value.length < 4) {
      return Promise.reject(new Error('Must be more than 4 digits'))
    } else if (value.length > 12) {
      return Promise.reject(new Error('Must be less than 12 digits'))
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return Promise.reject(new Error('Must be letter or number'))
    } else {
      return Promise.resolve()
    }
  }

  return (
    <div className='login'>
      <header className='login-header'>
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
          <Form.Item
            name="username"
            rules={[
              {
                validator: inputValidator,
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                validator: inputValidator,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}

          <Form.Item className='login-submit'>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}




