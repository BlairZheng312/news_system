import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Button, theme, Dropdown, Avatar } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { logout } from '../../store/authSlice';
import { setCollapsed } from '../../store/collapseSlice';

export default function TopHeader() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { Header } = Layout;

    // get login user info from store
    const auth = useSelector(state => state.auth)

    // control sidemenu collapse
    const collapse = useSelector(state => state.collapse)

    // user avatar drop down (user area, user role, logout option)
    const items = [
        {
            key: '1',
            label: `${auth.area} ${auth.role}`,
        },
        {
            key: '2',
            danger: true,
            label: auth.isLogin ? 'Log out' : 'Log in'
        },
    ];

    // logout click event
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onClick = (key) => {
        if (key.key === '2') {
            dispatch(logout());
            navigate('/login')
        }
    };

    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
                type="text"
                icon={collapse.collapseStatus ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => dispatch(setCollapsed(!collapse.collapseStatus))}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <div style={{ float: 'right', marginRight: '24px' }}>
                <span style={{ padding: '10px' }}>Welcome
                    <span style={{ color: '#ef3c00d8' }}>
                        {' ' + auth.username}
                    </span>
                </span>
                <Dropdown
                    menu={{
                        items,
                        onClick
                    }}
                >
                    <Avatar size={36} icon={<UserOutlined style={{ color: '#ef3c00d8' }} color={'white'} />} />
                </Dropdown>
            </div>
        </Header>
    )
}









