import React, { useEffect, useState } from 'react'
import { Tree, Form, Input, Divider } from 'antd';
import sideMenuItems from '../../config/sideMenu';

const getSideMenu = (items) => {
    return items.map(item => {
        if (item.children) {
            return { title: item.label, key: item.key, children: getSideMenu(item.children) }
        } else {
            return { title: item.label, key: item.key }
        }
    })
}

const treeData = getSideMenu(sideMenuItems)

export default function AddPermission(props) {
    const [checkedKeys, setCheckedKeys] = useState(props.role.menus)
    const onCheck = (checkedKeys, info) => {
        info.node.checked = !info.node.checked
        setCheckedKeys(checkedKeys)
        props.setMenu(checkedKeys)
    };
    useEffect(() => {
        setCheckedKeys(props.role.menus)
    }, [props.role.menus])
    return (
        <Form
            name="addForm"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Role name" name="role_name">
                <Input placeholder={props.role.role_name} disabled />
            </Form.Item>
            <Divider />
            <Tree
                checkable
                defaultCheckedKeys={props.role.menus}
                checkedKeys={checkedKeys}
                onCheck={onCheck}
                treeData={treeData}
                style={{ height: '200px', overflow: 'auto' }}
            />
        </Form>
    );
}

