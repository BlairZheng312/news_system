import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import sideMenuItems from '../../config/sideMenu';
import './index.css'

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export default function SideMenu() {
    const collapsed = useSelector(state => state.collapsed);
    const { Sider } = Layout;
    const navigate = useNavigate()
    const location = useLocation()
    const selectedKey = [location.pathname]
    let openKey
    sideMenuItems.forEach(item => {
        const cItem = item.children?.find(cItem => cItem.key === location.pathname)
        if (cItem) {
            openKey = [item.key]
        }
    })

    return (
        <Sider trigger={null} collapsible collapsed={collapsed.collapseStatus}>
            <div className='sidemenu'>
                <div className="sidemenu-logo" >{collapsed.collapseStatus?'News':'News Delivery System'}</div>
                <div className='sidemenu-content'>
                    <Menu
                        selectedKeys={selectedKey}
                        defaultOpenKeys={openKey}
                        mode="inline"
                        theme="dark"
                        items={sideMenuItems.map(item => getItem(item.label, item.key, item.icon, item.children)
                        )}
                        onClick={(e) => { navigate(e.key) }}
                    />
                </div>
            </div>
        </Sider >
    )
}
