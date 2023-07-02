import React, { useState } from 'react'
import { Layout, Button, theme, Dropdown, Avatar } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';

export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { Header } = Layout;

    const items = [
        {
            key: '1',
            label: 'Admin',
        },
        {
            key: '2',
            danger: true,
            label: 'Log out',
        },
    ];
    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
            <div style={{ float: 'right' }}>
                <span style={{ padding: '10px' }}>Welcome</span>
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <Avatar size={36} icon={<UserOutlined style={{color: '#fbb215'}} color={'white'}/>} />
                </Dropdown>
            </div>
        </Header>
    )
}









