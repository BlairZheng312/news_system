import React, { useEffect, useState } from 'react'
import { Divider, Table, Button, Modal, Form, Space, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useGetUserListQuery, useRegisterMutation, useDeleteUserMutation, useUpdateUserMutation } from '../../../store/requestApi';
import UserForm from './UserForm'

export default function User() {
  // set table column title & index
  const columns = [
    {
      title: 'Area',
      dataIndex: 'area',
      render: area => <b>{area}</b>
    },
    {
      title: 'User Name',
      dataIndex: 'username',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Register Time',
      dataIndex: 'register_time',
      render: (register_time) => new Date(register_time).toDateString()
    },
    {
      title: 'Action',
      render: (user) => (
        <Space size="middle" >
          <Button
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => { showUpdate(user) }}
            style={{ color: '#ef3c00d8' }}
            disabled={user.username === 'Admin'}
          />
          <Button
            shape='circle'
            icon={<DeleteOutlined />}
            onClick={() => { showDeleteConfirm(user) }}
            style={{ color: '#ef3c00d8' }}
            disabled={user.username === 'Admin'}
          />
        </Space>
      ),
    },
  ];

  // fetch user list from db
  const [userList, setUserList] = useState([])
  const { data, isSuccess, refetch } = useGetUserListQuery()
  useEffect(() => {
    isSuccess && setUserList(data.data)
  }, [isSuccess, data]);

  // control new user modal open/close
  const [createUser, setCreateUser] = useState(false)

  // connect to new user modal form
  const [form] = Form.useForm()

  // send user register/update query & update user list
  const [registerQuery] = useRegisterMutation()
  const [updateQuery] = useUpdateUserMutation()
  const userOk = async () => {
    try {
      const formValue = await form.validateFields()
      form.resetFields()
      if (formValue) {
        if (user._id) {
          const updateInfo = await updateQuery(formValue)
          console.log(formValue)
          if (updateInfo.data.code === 0) {
            message.success('Update success')
            refetch()
            isSuccess && setUserList(data.data)
          } else {
            message.error(updateInfo.data.msg)
          }
        } else {
          const registerInfo = await registerQuery(formValue)
          if (registerInfo.data.code === 0) {
            message.success('Register success')
            setUserList([...userList, registerInfo.data.data])
          } else {
            message.error(registerInfo.data.msg)
          }
        }
        setCreateUser(false)
      }
    } catch {
      message.error('Validation failed, please try again');
    }
  };

  // send user delete query & refetch user list
  const [modal, contextHolder] = Modal.useModal();
  const [deleteQuery] = useDeleteUserMutation()
  const showDeleteConfirm = (user) => {
    modal.confirm({
      title: `Confirm to delete ${user.username}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      async onOk() {
        const deleteInfo = await deleteQuery({ userId: user._id })
        if (deleteInfo.data.code === 0) {
          message.success('User Deleted')
          refetch()
          isSuccess && setUserList(data.data)
        }
      }
    });
  };

  const [user, setUser] = useState({})
  const showUpdate = (user) => {
    setUser(user)
    setCreateUser(true)
    form.resetFields()
  }

  return (
    <div>
      <div >
        <Button
          type='primary'
          onClick={() => {
            form.resetFields()
            setUser({})
            setCreateUser(true)
          }}
        >Add New User</Button>
      </div>
      <Divider />
      <Table
        columns={columns}
        dataSource={userList}
        rowKey='_id'
        pagination={{ defaultPageSize: 4 }}
      />
      <Modal
        title={user._id ? 'Update User' : 'Create New User'}
        okText='Save'
        open={createUser}
        onOk={userOk}
        onCancel={() => {
          setCreateUser(false)
          form.resetFields()
        }}
        destroyOnClose={true}
      >
        <UserForm form={form} user={user} />
      </Modal>
      {contextHolder}
    </div>
  );
}


