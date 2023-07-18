import React from 'react'
import { Form, Input, Select } from 'antd';
import category from '../../../../config/news_category';

export default function NewsInfo(props) {
    const { Option } = Select
    const { form } = props
    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            form={form}
        >
            <Form.Item
                name="title"
                label='News Title'
                rules={[{ required: true }]}
            >
                <Input placeholder="Type in news title" />
            </Form.Item>
            <Form.Item
                name="category"
                label="News Category"
                rules={[{ required: true }]}
            >
                <Select placeholder="Select a category" allowClear>
                    {category.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
                </Select>
            </Form.Item>
        </Form>
    )
}
