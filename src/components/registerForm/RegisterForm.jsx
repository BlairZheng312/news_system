import React, { useState, useEffect } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';
import { useGetRoleListQuery } from '../../store/requestApi';

export default function LoginForm(props) {
  const { Option } = Select;

  // fetch rolelist from db
  const [roleList, setRoleList] = useState([])
  const { data, isSuccess } = useGetRoleListQuery()
  useEffect(() => {
    isSuccess && setRoleList(data.data)
  }, [isSuccess, data]);

  return (
    <Form
      form={props.form}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="username"
      // rules={[
      //   {
      //     validator: usernameValidator,
      //   },
      // ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
      // rules={[
      //   {
      //     validator: passwordValidator,
      //   },
      // ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
      // rules={[
      //   {
      //     validator: passwordValidator,
      //   },
      // ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select a role" allowClear>
          {roleList.map(item => {
            return <Option value={item.role_name}>{item.role_name}</Option>
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}