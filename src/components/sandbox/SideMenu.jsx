import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Menu } from 'antd';
import { useGetRoleQuery } from '../../store/requestApi';
import sideMenuItems from '../../config/side_menu';
import { setPermissionList } from '../../store/permissionSlice';
import './index.scss'

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
    const collapse = useSelector(state => state.collapse);

    // fetch role permission from db and store in redux
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { data, isSuccess } = useGetRoleQuery(auth.role)
    useEffect(() => {
        isSuccess && dispatch(setPermissionList(data.data.menus))
    }, [isSuccess, data, dispatch]);
    const rolePermission = useSelector(state => state.permission).permissionList

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
                        const newChild = getSideMenu(item.children, rolePermission)
                        if (newChild.length > 0) {
                            sideMenu.push({ ...item, children: newChild })
                        }
                    }
                }
            }
        })
        return sideMenu
    }

    // set side menu (super manager has full access)
    let sideMenu = []
    if (auth.role === 'Super Manager') {
        sideMenu = sideMenuItems
    } else {
        sideMenu = getSideMenu(sideMenuItems, rolePermission)
    }

    // resume opened sidemenu
    const selectedKey = [location.pathname]
    let openKey
    sideMenu.forEach(item => {
        const cItem = item.children?.find(cItem => cItem.key === location.pathname)
        if (cItem) {
            openKey = [item.key]
        }
    })

    return (
        <Sider trigger={null} collapsible collapsed={collapse.collapseStatus}>
            <div className='sidemenu'>
                <div className="sidemenu-logo" >{collapse.collapseStatus ? 'News' : 'News Delivery System'}</div>
                <div className='sidemenu-content'>
                    <Menu
                        selectedKeys={selectedKey}
                        defaultOpenKeys={openKey}
                        mode="inline"
                        theme="light"
                        items={sideMenu.map(item => getItem(item.label, item.key, item.icon, item.children)
                        )}
                        onClick={(e) => { navigate(e.key) }}
                    />
                </div>
            </div>
        </Sider >
    )
}




