import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Divider, Table, Button, Modal, Form, message } from 'antd';
import { useAddRoleMutation, useGetRoleListQuery, useAddPermissionMutation } from '../../../store/requestApi';
import { setRoleList } from '../../../store/roleListSlice';
import AddRole from '../../../components/roleForm/AddRole'
import AddPermission from '../../../components/roleForm/AddPermission';


const columns = [
  {
    title: 'Role Name',
    dataIndex: 'role_name',
  },
  {
    title: 'Create Time',
    dataIndex: 'create_time',
  },
  {
    title: 'Authorized Time',
    dataIndex: 'auth_time',
  },
  {
    title: 'Authorizer',
    dataIndex: 'auth_name',
  }
];

export default function RoleList() {
  const [form] = Form.useForm();
  const [role, setRole] = useState({})
  const dispatch = useDispatch()

  const { data, isSuccess } = useGetRoleListQuery()
  useEffect(() => {
    isSuccess && dispatch(setRoleList(data.data))
  }, [isSuccess, data, dispatch]);

  const roleList = useSelector(state => state.roleList)

  const [createRole, setCreateRole] = useState(false);
  const [rolePermission, setRolePermission] = useState(false)

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
          dispatch(setRoleList([...roleList.roleList, newRole.data.data]))
        } else {
          message.error(newRole.data.msg)
        }
      }
    } catch {
      message.error('Validation failed, please try again');
    }
  };

  const [checkedKeys, setCheckedKeys] = useState(role.menu)

  const setMenu = (menus) => {
    setCheckedKeys(menus)
  }

  const [addPermissionQuery] = useAddPermissionMutation()
  const auth = useSelector(state => state.auth)
  const permissionOk = async () => {
    const newPermission = await addPermissionQuery({
      role_name: role.role_name,
      menus: checkedKeys,
      auth_name: auth.role
    })
    if (newPermission.data.code === 0) {
      setRolePermission(false)
      const newRoleList = roleList.roleList.map(item => {
        if (item._id === newPermission.data.data._id)
          return newPermission.data.data
        else return item
      })
      dispatch(setRoleList(newRoleList))
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
        dataSource={roleList.roleList}
        rowKey='_id'
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [role._id],
          onChange: (roleKey, role) => {
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

      <Modal title="Create new role" okText='Save' open={createRole} onOk={roleOk} onCancel={() => setCreateRole(false)}>
        <AddRole form={form} />
      </Modal>
      <Modal title="Set role permission" okText='Save' open={rolePermission} onOk={permissionOk} onCancel={() => setRolePermission(false)}>
        <AddPermission role={role} setMenu={setMenu} />
      </Modal>
    </div>
  );
}


