import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Row, Col, Card, List } from 'antd'
import { useGetNewsByVisitQuery } from '../../store/requestApi'
import category from '../../config/news_category'

export default function News() {
    const { data, isSuccess } = useGetNewsByVisitQuery()
    const [newsList, setNewsList] = useState([])

    useEffect(() => {
        isSuccess && setNewsList(Object.entries(_.groupBy(data.data, item => item.category)))
    }, [data, isSuccess])

    return (
        <div className='entry'>
            <header className='entry-header'>
                <h1>Global News Platform</h1>
            </header>
            <div className='news-content'>
                <Row gutter={[16, 16]} >
                    {newsList.map(record =>
                        <Col span={8} key={record[0]}>
                            <Card title={category.filter(item => item.id === +record[0])[0].name}
                                bordered={true}
                                hoverable={true}>
                                <List
                                    className='news-record'
                                    size="small"
                                    bordered
                                    pagination={{ pageSize: 3 }}
                                    dataSource={record[1]}
                                    renderItem={(news) => <List.Item><Link to={`/news/${news._id}`}>{news.title}</Link></List.Item>}
                                />
                            </Card>
                        </Col>)}
                </Row>
            </div>

        </div>
    )
}
