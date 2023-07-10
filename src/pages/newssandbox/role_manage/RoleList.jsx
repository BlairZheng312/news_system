import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Divider, Table, Button, Modal, Form, message } from 'antd';
import { useAddRoleMutation, useGetRoleListQuery, useAddPermissionMutation } from '../../../store/requestApi';
import AddRole from '../../../components/roleForm/AddRole'
import AddPermission from '../../../components/roleForm/AddPermission';

// table column title & index
const columns = [
  {
    title: 'Role Name',
    dataIndex: 'role_name',
  },
  {
    title: 'Create Time',
    dataIndex: 'create_time',
    render: (create_time) => new Date(create_time).toDateString()
  },
  {
    title: 'Authorized Time',
    dataIndex: 'auth_time',
    render: (auth_time) => auth_time ? new Date(auth_time).toDateString() : null
  },
  {
    title: 'Authorizer',
    dataIndex: 'auth_name',
  }
];

export default function RoleList() {
  // connect to modal form
  const [form] = Form.useForm()

  // store role list
  const [roleList, setRoleList] = useState([])

  // store selected role
  const [role, setRole] = useState({})

  // fetch rolelist from db
  const { data, isSuccess } = useGetRoleListQuery()
  useEffect(() => {
    isSuccess && setRoleList(data.data)
  }, [isSuccess, data]);

  // control modal open/close
  const [createRole, setCreateRole] = useState(false);
  const [rolePermission, setRolePermission] = useState(false)

  // create new role
  const [addRoleQuery] = useAddRoleMutation()
  const roleOk = async () => {
    try {
      const formValue = await form.validateFields()
      form.resetFields()
      if (formValue) {
        const newRole = await addRoleQuery({
          role_name: formValue.role_name,
          create_time: Date.now()
        })
        if (newRole.data.code === 0) {
          setCreateRole(false)
          message.success('Role added successfully')
          setRoleList([...roleList, newRole.data.data])
        } else {
          message.error(newRole.data.msg)
        }
      }
    } catch {
      message.error('Validation failed, please try again');
    }
  };

  // receive checked permission keys from child component
  const [checkedKeys, setCheckedKeys] = useState(role.menu)
  const setMenu = (menus) => {
    setCheckedKeys(menus)
  }

  // confirm updated permission (to update db, selected role, role list)
  const [addPermissionQuery] = useAddPermissionMutation()
  const auth = useSelector(state => state.auth)
  const permissionOk = async () => {
    const newPermission = await addPermissionQuery({
      role_name: role.role_name,
      menus: checkedKeys,
      auth_name: auth.role
    })
    if (newPermission.data.code === 0) {
      const newRoleList = roleList.map(item => {
        if (item._id === newPermission.data.data._id)
          return newPermission.data.data
        else return item
      })
      setRoleList(newRoleList)
      setRole(newPermission.data.data)
      setRolePermission(false)
      message.success('Permission updated successfully')
    } else (
      message.error(newPermission.data.msg)
    )
  };

  return (
    <div>
      <div >
        <Button
          type='primary'
          style={{ marginRight: '20px' }}
          onClick={() => setCreateRole(true)}
        >Create New Role</Button>
        <Button
          type='primary'
          disabled={!role._id}
          onClick={() => setRolePermission(true)}
        >Set Role Permission</Button>
      </div>

      <Divider />
      <Table
        columns={columns}
        dataSource={roleList}
        rowKey='_id'
        pagination={{ defaultPageSize: 4 }}
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [role._id],
          onChange: (_, role) => {
            setRole(role[0])
          }
        }}
        onRow={(role) => {
          return {
            onClick: () => {
              setRole(role)
            }
          }
        }}
      />
      <Modal title="Create New Role" okText='Save' open={createRole} onOk={roleOk} onCancel={() => setCreateRole(false)}>
        <AddRole form={form} />
      </Modal>
      <Modal title="Set Role Permission" okText='Save' destroyOnClose={true} open={rolePermission} onOk={permissionOk} onCancel={() => setRolePermission(false)}>
        <AddPermission role={role} setMenu={setMenu} />
      </Modal>
    </div>
  );
}


