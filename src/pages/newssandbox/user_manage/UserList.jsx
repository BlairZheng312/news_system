import React, { useEffect, useState } from 'react'
import { Divider, Table, Button, Modal, Form, Space } from 'antd';
import { useGetUserListQuery } from '../../../store/requestApi';
import Link from 'antd/es/typography/Link';
import RegisterForm from '../../../components/registerForm/RegisterForm'

// table column title & index
const columns = [
  {
    title: 'User Name',
    dataIndex: 'username',
  },
  {
    title: 'Register Time',
    dataIndex: 'register_time',
    render: (register_time) => new Date(register_time).toDateString()
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
  {
    title: 'Action',
    render: () => (
      <Space size="middle">
        <Link>Update</Link>
        <Link>Delete</Link>
      </Space>
    ),
  },
];

export default function UserList() {
  // connect to modal form
  const [form] = Form.useForm()

  // control modal open/close
  const [createUser, setCreateUser] = useState(false)

  // fetch user list from db
  const [userList, setUserList] = useState([])
  const { data, isSuccess } = useGetUserListQuery()
  useEffect(() => {
    isSuccess && setUserList(data.data)
  }, [isSuccess, data]);

  const userOk = () => {
    setCreateUser(false)
  }
  return (
    <div>
      <div >
        <Button
          type='primary'
          onClick={() => setCreateUser(true)}
        >Add New User</Button>
      </div>
      <Divider />
      <Table
        columns={columns}
        dataSource={userList}
        rowKey='_id'
        pagination={{ defaultPageSize: 4 }}
      />
      <Modal title="Create New User" okText='Save' open={createUser} onOk={userOk} onCancel={() => setCreateUser(false)}>
        <RegisterForm form={form} />
      </Modal>
    </div>
  );
}


