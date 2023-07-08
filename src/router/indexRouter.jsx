import React from 'react'
import { Navigate } from 'react-router'
import Login from '../pages/login/Login'
import Auth from '../components/auth_control/Auth'
import NewsSandBox from '../pages/newssandbox/NewsSandBox'
import Home from '../pages/newssandbox/home/Home'
import UserList from '../pages/newssandbox/user_manage/UserList'
import RoleList from '../pages/newssandbox/role_manage/RoleList'
import NoPermission from '../pages/newssandbox/no_perssion/NoPermission'
import Register from '../pages/login/Register'

const elementTable = [
    {
        path: '/login',
        element: < Login />
    },
    {
        path: '/register',
        element: < Register />
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
                path: 'user-manage',
                element:
                    < UserList />
            },
            {
                path: 'role-manage',
                element:
                    < RoleList />
            },
            {
                path: '*',
                element: < NoPermission />
            },
        ]
    }
]

export default elementTable