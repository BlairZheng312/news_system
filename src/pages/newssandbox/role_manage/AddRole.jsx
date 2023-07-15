import React from 'react'
import { Form, Input } from 'antd';

export default function AddRole(props) {
    return (
        <Form
            form={props.form}
            name="addForm"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
        >
            <Form.Item
                label="Role name"
                name="role_name"
                rules={[
                    {
                        required: true,
                        message: 'Please input role name',
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}
