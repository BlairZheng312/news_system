import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Button, Space, Tag, Modal, message } from 'antd';
import { useGetReviewListQuery, useAddNewsMutation, useDeleteNewsMutation } from '../../../store/requestApi';
import useNotification from '../../../hooks/useNotification';
import categoryList from '../../../config/news_category';
import publishMap from '../../../config/review_publish';

export default function Draft() {
    // set table column title & index
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            render: (title, item) => <Link to={`/news-manage/draft/${item._id}`}>{title}</Link>,
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Area',
            dataIndex: 'area',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            render: (category) => {
                return categoryList.filter(item => item.id === +category)[0].name
            }
        },
        {
            title: 'Publish Status',
            dataIndex: 'publishState',
            filters: [
                ...Object.entries(publishMap)
                    .filter(item => item[0] > 2)
                    .map(item => ({
                        text: item[1][0],
                        value: +item[0]
                    }))],
            onFilter: (value, item) => item.publishState === value,
            render: (publishState) => {
                return <Tag color={publishMap[publishState][1]}>{publishMap[publishState][0]}</Tag>
            }
        },
        {
            title: 'Action',
            render: (news) => (
                <Space size="middle" >
                    {(news.publishState === 3) &&
                        <Button
                            style={{ color: '#ef3c00d8', width: '100px' }}
                            onClick={() => { handlePublish(news) }}
                        >Publish</Button>}
                    {(news.publishState === 4) &&
                        <Button
                            style={{ color: '#ef3c00d8', width: '100px' }}
                            onClick={() => { handleDiscontinue(news) }}
                        >Discontinue</Button>}
                    {(news.publishState === 5) &&
                        <>
                            <Button
                                style={{ color: '#ef3c00d8', width: '100px' }}
                                onClick={() => { handleDelete(news) }}
                            >Delete</Button>
                            <Button
                                style={{ color: '#ef3c00d8', width: '100px' }}
                                onClick={() => { handlePublish(news) }}
                            >Re-Publish</Button>
                        </>
                    }
                </Space>
            ),
        },
    ];

    // fetch news list from db 
    // if user's area is global, can see news from all areas
    // otherwize, can only see news within the same area
    // publish state is ready to publish, published, withdrawn (publishState > 2)
    const [newsList, setNewsList] = useState([])
    const auth = useSelector(state => state.auth)
    const { data, isSuccess, refetch } = useGetReviewListQuery({ area: auth.area, publishState: [345] })
    useEffect(() => {
        isSuccess && setNewsList(data.data)
    }, [isSuccess, data]);

    // publish/re-publish news 
    const [modal, contextHolder] = Modal.useModal()
    const [addNews] = useAddNewsMutation()
    const { openNotification } = useNotification()
    const handlePublish = (news) => {
        modal.confirm({
            title: `Confirm to publish ${news.title}?`,
            okText: 'Confirm',
            cancelText: 'Cancel',
            async onOk() {
                const confirmInfo = await addNews({
                    _id: news._id,
                    publishState: 4,
                    publishTime: Date.now()
                })
                if (confirmInfo.data.code === 0) {
                    openNotification(3)
                    refetch()
                } else {
                    message.error(news.data.msg)
                }
            }
        });
    };

    // discontinue news from published
    const handleDiscontinue = (news) => {
        modal.confirm({
            title: `Confirm to discontinue ${news.title}?`,
            okText: 'Confirm',
            cancelText: 'Cancel',
            async onOk() {
                const confirmInfo = await addNews({
                    _id: news._id,
                    publishState: 5,
                })
                if (confirmInfo.data.code === 0) {
                    openNotification(4)
                    refetch()
                } else {
                    message.error(news.data.msg)
                }
            }
        });
    };

    // delete discontinued news
    const [deleteNews] = useDeleteNewsMutation()
    const handleDelete = async (news) => {
        modal.confirm({
            title: `Confirm to delete ${news.title}?`,
            okText: 'Confirm',
            cancelText: 'Cancel',
            async onOk() {
                const deleteInfo = await deleteNews({ newsId: news._id })
                if (deleteInfo.data.code === 0) {
                    openNotification(5)
                    refetch()
                } else {
                    message.error(news.data.msg)
                }
            }
        });
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={newsList}
                rowKey='_id'
                pagination={{ defaultPageSize: 4 }}
            />
            {contextHolder}
        </div>
    );
}
