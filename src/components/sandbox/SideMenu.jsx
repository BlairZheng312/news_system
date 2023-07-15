import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout, Menu } from 'antd';
import { useGetRoleQuery } from '../../store/requestApi';
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
    const { Sider } = Layout;

    // navigate page routes
    const navigate = useNavigate()
    const location = useLocation()

    // control sidemenu collapse
    const collapsed = useSelector(state => state.collapsed);

    // fetch role permission from db
    const auth = useSelector(state => state.auth)
    const [rolePermission, setRolePermission] = useState([])
    const { data, isSuccess } = useGetRoleQuery(auth.role)
    useEffect(() => {
        isSuccess && setRolePermission(data.data.menus)
    }, [isSuccess, data]);

    // set sidemenu by role permission
    const getSideMenu = (sideMenuItems, rolePermission) => {
        const sideMenu = []
        sideMenuItems.forEach(item => {
            if (item.isPublic) {
                sideMenu.push(item)
            } else {
                if (rolePermission.indexOf(item.key) !== -1) {
                    sideMenu.push(item)
                }
                else {
                    if (item.children) {
                        const childmenu = getSideMenu(item.children, rolePermission)
                        if (childmenu.length > 0) {
                            item.children = childmenu
                            sideMenu.push(item)
                        }
                    }
                }
            }
        })
        return sideMenu
    }

    let sideMenu = []
    if(auth.role === 'Super Manager'){
        sideMenu = sideMenuItems
    }else{
        sideMenu = getSideMenu(sideMenuItems, rolePermission)
    }

    // resume opened sidemenu
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
                <div className="sidemenu-logo" >{collapsed.collapseStatus ? 'News' : 'News Delivery System'}</div>
                <div className='sidemenu-content'>
                    <Menu
                        selectedKeys={selectedKey}
                        defaultOpenKeys={openKey}
                        mode="inline"
                        theme="dark"
                        items={sideMenu.map(item => getItem(item.label, item.key, item.icon, item.children)
                        )}
                        onClick={(e) => { navigate(e.key) }}
                    />
                </div>
            </div>
        </Sider >
    )
}
