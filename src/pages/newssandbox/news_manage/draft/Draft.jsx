import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Button, Space, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, SendOutlined } from '@ant-design/icons';
import { useGetNewsListQuery, useDeleteNewsMutation } from '../../../../store/requestApi';
import categoryList from '../../../../config/news_category';

export default function Draft() {
  const navigate = useNavigate()

  // set table column title & index
  const columns = [
    {
      title: 'News Title',
      dataIndex: 'title',
      render: (title, item) => <Link to={`${item._id}`}>{title}</Link>,
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'News Category',
      dataIndex: 'category',
      render: (category) => {
        return categoryList.filter(item => item.id === +category)[0].name
      }
    },
    {
      title: 'Action',
      render: (news) => (
        <Space size="middle" >
          <Button
            shape='circle'
            icon={<EditOutlined />}
            style={{ color: '#ef3c00d8' }}
            onClick={() => { navigate('update') }}
          />
          <Button
            shape='circle'
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(news)}
            style={{ color: '#ef3c00d8' }}
          />
          <Button
            shape='circle'
            icon={<SendOutlined />}
            style={{ color: '#ef3c00d8' }}
          />
        </Space>
      ),
    },
  ];

  // fetch news draft list from db
  const [newsList, setNewsList] = useState([])
  const auth = useSelector(state => state.auth)
  const { data, isSuccess, refetch } = useGetNewsListQuery({ author: auth.username, reviewState: 0 })
  useEffect(() => {
    isSuccess && setNewsList(data.data)
  }, [isSuccess, data]);

  // send user delete query & refetch user list
  const [modal, contextHolder] = Modal.useModal();
  const [deleteQuery] = useDeleteNewsMutation()
  const showDeleteConfirm = (news) => {
    modal.confirm({
      title: `Confirm to delete ${news.title}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      async onOk() {
        const deleteInfo = await deleteQuery({ newsId: news._id })
        if (deleteInfo.data.code === 0) {
          message.success('News Deleted')
          refetch()
        }
      }
    });
  };

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
