import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    SmileOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import './index.css'
import { useNavigate } from 'react-router';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    {
        label: 'Home',
        key: '/home',
        icon: <HomeOutlined />
    },
    {
        label: 'Users',
        key: '/user-manage',
        icon: <SmileOutlined />,
        children: [
            {
                label: 'User List',
                key: '/user-manage/user-list'
            }
        ]
    },
    {
        label: 'Permission',
        key: '/permission-manage',
        icon: <TeamOutlined />,
        children: [
            {
                label: 'Role List',
                key: 'permission-manage/role-list'
            },
            {
                label: 'Permission List',
                key: 'permission-manage/permission-list'
            },
        ]
    },
]


export default function SideMenu() {
    const [collapsed] = useState(false);
    const { Sider } = Layout;
    const navigate = useNavigate()

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" >News Delivery System</div>
            <Menu
                defaultSelectedKeys={['/home']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                items={items.map(item => getItem(item.label, item.key, item.icon, item.children)
                )}
                onClick={(e)=>{navigate(e.key)}}
            />
        </Sider >
    )
}
