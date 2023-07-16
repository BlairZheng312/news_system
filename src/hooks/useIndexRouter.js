import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import Login from '../pages/login/Login'
import Auth from '../components/auth_control/Auth'
import NewsSandBox from '../pages/newssandbox/NewsSandBox'
import Home from '../pages/newssandbox/home/Home'
import User from '../pages/newssandbox/user_manage/User'
import Role from '../pages/newssandbox/role_manage/Role'
import NoPermission from '../pages/newssandbox/no_perssion/NoPermission'

const childrenRoutesMap = [
    {
        path: '/user-manage',
        element:
            < User />
    },
    {
        path: '/role-manage',
        element:
            < Role />
    }
]

export default function useIndexRouter() {
    // fetch role permission list from store
    const rolePermission = useSelector(state => state.permission)

    // get route pages according permission list
    const getChildrenRoutes = (childrenRoutesMap, rolePermission) => {
        const childrenRoutes = []
        childrenRoutesMap.forEach(item => {
            if (rolePermission.indexOf(item.path) !== -1) {
                childrenRoutes.push(item)
            }
        })
        return childrenRoutes
    }
    const childrenRoutes = getChildrenRoutes(childrenRoutesMap, rolePermission.permissionList)

    return [
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
                    path: '/home',
                    element:
                        < Home />
                },
                {
                    path: '*',
                    element: < NoPermission />
                },
                ...childrenRoutes
            ]
        }
    ]
}
