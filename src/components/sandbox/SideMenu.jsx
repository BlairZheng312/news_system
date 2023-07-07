import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    SmileOutlined,
    TeamOutlined,
    HighlightOutlined,
    EyeOutlined
} from '@ant-design/icons';
import './index.css'
// import { useGetSideMenuQuery } from '../../store/requestApi';
import sideMenuItems from '../../config/sideMenu';

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
    '/permission-manage': <TeamOutlined />,
    '/news-manage': <HighlightOutlined />,
    '/review-manage': <EyeOutlined />
}

export default function SideMenu() {
    const [collapsed] = useState(false);
    const { Sider } = Layout;
    const navigate = useNavigate()
    const location = useLocation()
    const selectedKey = [location.pathname]
    const openKey = ['/'+location.pathname.split('/')[1]]

    // const [sideMenu, setSideMenu] = useState([])
    // const {data, isSuccess} = useGetSideMenuQuery()
    // useEffect(() => {
    //     isSuccess && setSideMenu(data)
    // }, [isSuccess,data]);

    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className='sidemenu'>
                <div className="sidemenu-logo" >News Delivery System</div>
                <div className='sidemenu-content'>
                    <Menu
                        selectedKeys={selectedKey}
                        defaultOpenKeys={openKey}
                        mode="inline"
                        theme="dark"
                        items={sideMenuItems.map(item => getItem(item.label, item.key, iconList[item.key], item.children)
                        )}
                        onClick={(e) => { navigate(e.key) }}
                    />
                </div>
            </div>
        </Sider >
    )
}
