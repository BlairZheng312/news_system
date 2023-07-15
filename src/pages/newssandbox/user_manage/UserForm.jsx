import React, { useState, useEffect } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Select } from 'antd';
import { useGetRoleListQuery } from '../../../store/requestApi';
import area from '../../../config/area';

export default function UserForm(props) {
  const { Option } = Select;

  // fetch rolelist from db
  const [roleList, setRoleList] = useState([])
  const { data, isSuccess } = useGetRoleListQuery()
  useEffect(() => {
    isSuccess && setRoleList(data.data)
  }, [isSuccess, data]);

  // define input validation rule
  const usernameValidator = (_, value) => {
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
  const passwordValidator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your Information'))
    } else if (value.length < 4) {
      return Promise.reject(new Error('Must be more than 4 digits'))
    } else if (value.length > 12) {
      return Promise.reject(new Error('Must be less than 12 digits'))
    } else if (!/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\\@&=])[a-z0-9\\@&=]+$/.test(value)) {
      return Promise.reject(new Error('Must contain letter, number, \\@&='))
    } else {
      return Promise.resolve()
    }
  }

  const { form } = props
  const user = props.user || {}
  return (
    <Form
      form={form}
    >
      <Form.Item
        name="username"
        rules={[{ validator: usernameValidator }]}
        initialValue={user.username}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          disabled={user._id} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={user._id?[]:[{ validator: passwordValidator }]}
        initialValue={user.password}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          disabled={user._id}
        />
      </Form.Item>
      <Form.Item
        name="area"
        label="Area"
        rules={[{ required: true }]}
        initialValue={user.area}
      >
        <Select placeholder="Select a role" allowClear>
          {area.map(item => <Option value={item.area_name} key={item.area_name}>{item.area_name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true }]}
        initialValue={user.role}
      >
        <Select placeholder="Select a role" allowClear>
          {roleList.map(item => <Option value={item.role_name} key={item._id}>{item.role_name}</Option>)}
        </Select>
      </Form.Item>
    </Form>
  )
}