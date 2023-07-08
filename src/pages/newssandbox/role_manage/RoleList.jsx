import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Divider, Table, Button } from 'antd';
import { useGetRoleListQuery } from '../../../store/requestApi';
import { setRoleList } from '../../../store/roleListSlice';

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
    dataIndex: 'authorized_time',
  },
  {
    title: 'Authorizer',
    dataIndex: 'auth_name',
  }
];

export default function RoleList() {
  const dispatch = useDispatch()
  const [role, setRole] = useState({})

  const { data, isSuccess } = useGetRoleListQuery()
  useEffect(() => {
    isSuccess && dispatch(setRoleList(data.data))
  }, [isSuccess, data, dispatch]);

  const roleList = useSelector(state => state.roleList)
  return (
    <div>
      <div >
        <Button type='primary' style={{ marginRight: '20px' }}>Create New Role</Button>
        <Button type='primary' disabled={!role._id}>Set Role Permission</Button>
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
    </div>
  );
}
