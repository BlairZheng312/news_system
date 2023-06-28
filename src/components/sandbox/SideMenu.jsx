import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    SmileOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import './index.css'
import { useNavigate } from 'react-router';
import axios from 'axios'

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const iconList = {
    '/home': <HomeOutlined />,
    '/user-manage': <SmileOutlined />,
    '/permission-manage': <TeamOutlined />
}

// const items = [
//     {
//         label: 'Home',
//         key: '/home',
//         icon: <HomeOutlined />
//     },
//     {
//         label: 'Users',
//         key: '/user-manage',
//         icon: <SmileOutlined />,
//         children: [
//             {
//                 label: 'User List',
//                 key: '/user-manage/user-list'
//             }
//         ]
//     },
//     {
//         label: 'Permission',
//         key: '/permission-manage',
//         icon: <TeamOutlined />,
//         children: [
//             {
//                 label: 'Role List',
//                 key: 'permission-manage/role-list'
//             },
//             {
//                 label: 'Permission List',
//                 key: 'permission-manage/permission-list'
//             },
//         ]
//     },
// ]

export default function SideMenu() {
    const [collapsed] = useState(false);
    const { Sider } = Layout;
    const navigate = useNavigate()
    const [sideMenu, setSideMenu] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/permission').then(res => {
            setSideMenu(res.data)
        })
    }, []);

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" >News Delivery System</div>
            <Menu
                defaultSelectedKeys={['/home']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                items={sideMenu.map(item => getItem(item.label, item.key, iconList[item.key], item.children)
                )}
                onClick={(e) => { navigate(e.key) }}
            />
        </Sider >
    )
}
