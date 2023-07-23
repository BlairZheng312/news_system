import React from 'react'
import { Form, Input } from 'antd';
import categoryList from '../../../../config/news_category';

export default function NewsReview(props) {
    // accept news info for news review before save/submit
    const { title, category, newsContent } = props.news

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            disabled={true}
        >
            <Form.Item
                name="title"
                label='News Title'
            >
                <Input placeholder={title} />
            </Form.Item>
            <Form.Item
                name="category"
                label="News Category"
            >
                <Input placeholder={category && categoryList.filter(item => item.id === +category)[0].name} />
            </Form.Item>
            <Form.Item
                name="content"
                label="News Content"
            >
                <div
                    dangerouslySetInnerHTML={{
                        __html: newsContent
                    }}
                    style={{
                        border: '1px #d9d9d9 solid',
                        borderRadius: '6px',
                        padding: '4px 11px',
                        color: 'rgba(0, 0, 0, 0.25)',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        cursor: 'not-allowed',
                        opacity: '1',
                        minHeight: '150px',
                        overflow: 'auto',
                        width: '100%',
                        display: 'inline-block',
                    }}>
                </div>
            </Form.Item>
        </Form >
    )
}
