import React from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Button, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Compose from '../compose/Compose'

export default function Update() {
    const location = useLocation()
    const navigate = useNavigate()

    // accept saved news info to pass for news update
    const { news } = location.state

    return (
        <div>
            < Button icon={< ArrowLeftOutlined />} onClick={() => navigate(-1)} />
            <Divider />
            <Compose news={news} />
        </div>
    )
}
