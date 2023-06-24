import React from 'react'
import { Navigate } from 'react-router'
import Login from '../pages/login/Login'
import Auth from '../components/auth_control/Auth'
import NewsSandBox from '../pages/newssandbox/NewsSandBox'
import Home from '../pages/newssandbox/home/Home'
import UserList from '../pages/newssandbox/user_manage/UserList'
import PermissionList from '../pages/newssandbox/permission_manage/PermissionList'
import RoleList from '../pages/newssandbox/permission_manage/RoleList'
import NoPermission from '../pages/newssandbox/no_perssion/NoPermission'

const elementTable = [
    {
        path: '/login',
        element: < Login />
    },
    {
        path: '/',
        element:
            <Auth>
                < NewsSandBox />
            </Auth>,
        children: [
            {
                index: true,
                element: < Navigate to='home' />
            },
            {
                path: 'home',
                element:
                    < Home />
            },
            {
                path: 'user-manage/user-list',
                element:
                    < UserList />
            },
            {
                path: 'permission-manage/role-list',
                element:
                    < RoleList />
            },
            {
                path: 'permission-manage/permission-list',
                element:
                    < PermissionList />
            },
            {
                path: '*',
                element: < NoPermission />
            },
        ]
    }
]

export default elementTable