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
import Compose from '../pages/newssandbox/news_manage/compose/Compose'
import Draft from '../pages/newssandbox/news_manage/draft/Draft'
import Preview from '../pages/newssandbox/news_manage/draft/Preview'
import Update from '../pages/newssandbox/news_manage/draft/Update'
import Submit from '../pages/newssandbox/news_manage/submission/Submit'
import Review from '../pages/newssandbox/review_manage/Review'
import Publish from '../pages/newssandbox/publish_manage/Publish'

const childrenRoutesMap = [
    {
        path: '/user-manage',
        element: < User />
    },
    {
        path: '/role-manage',
        element: < Role />
    },
    {
        path: '/news-manage',
        element: < Compose />
    },
    {
        path: '/news-manage/compose',
        element: < Compose />
    },
    {
        path: '/news-manage/draft',
        element: < Draft />,
    },
    {
        path: '/news-manage/draft/:id',
        element: < Preview />,
    },
    {
        path: '/news-manage/draft/update',
        element: < Update />,
    },
    {
        path: '/news-manage/submitted',
        element: < Submit />,
    },
    {
        path: '/review-manage',
        element: < Review />
    },
    {
        path: '/publish-manage',
        element: < Publish />
    },
]

export default function useIndexRouter() {
    // fetch role permission list from store
    const rolePermission = useSelector(state => state.permission)

    // get route pages according permission list
    const getChildrenRoutes = (childrenRoutesMap, rolePermission) => {
        const childrenRoutes = []
        childrenRoutesMap.forEach(item => {
            let itemArr = item.path.split('/')
            if(itemArr.length >=4){
                itemArr = itemArr.slice(0,3)
            }
            const itemPath = itemArr.join('/')
            if (rolePermission.indexOf(itemPath) !== -1) {
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
