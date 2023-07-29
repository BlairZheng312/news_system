import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Button, Space, Modal, message } from 'antd';
import { DeleteOutlined, EditOutlined, SendOutlined } from '@ant-design/icons';
import { useGetNewsListQuery, useDeleteNewsMutation, useAddNewsMutation } from '../../../../store/requestApi';
import useNotification from '../../../../hooks/useNotification';
import categoryList from '../../../../config/news_category';

export default function Draft() {
  const navigate = useNavigate()

  // set table column title & index
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (title, item) => <Link to={`${item._id}`}>{title}</Link>,
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      render: (category) => {
        return categoryList.filter(item => item.id === +category)[0].name
      }
    },
    {
      title: 'Action',
      render: (news) => (
        <Space size="middle">
          <Button
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => { navigate('update', { state: { news } }) }}
          />
          <Button
            shape='circle'
            icon={<DeleteOutlined />}
            onClick={() => showConfirm({ news, submit: false })}
          />
          <Button
            shape='circle'
            icon={<SendOutlined />}
            onClick={() => { showConfirm({ news, submit: true }) }}
          />
        </Space>
      ),
    },
  ];

  // fetch news list from db
  // user can only see their own news (author === username)
  // news states is draft (publishState ===0)
  const [newsList, setNewsList] = useState([])
  const auth = useSelector(state => state.auth)
  const { data, isSuccess, refetch } = useGetNewsListQuery({ author: auth.username, publishState: 0 })
  useEffect(() => {
    isSuccess && setNewsList(data.data)
  }, [isSuccess, data]);

  // send user delete/submit query & refetch user list
  const [modal, contextHolder] = Modal.useModal();
  const [deleteQuery] = useDeleteNewsMutation()
  const [addNews] = useAddNewsMutation()
  const { openNotification } = useNotification()
  const showConfirm = ({ news, submit }) => {
    modal.confirm({
      title: `Confirm to ${submit ? 'submit' : 'delete'} ${news.title}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      async onOk() {
        if (!submit) {
          const deleteInfo = await deleteQuery({ newsId: news._id })
          if (deleteInfo.data.code === 0) {
            message.success('News Deleted')
          }
        } else {
          const submitInfo = await addNews({
            _id: news._id,
            publishState: 1
          })
          if (submitInfo.data.code === 0) {
            openNotification(1)
          } else {
            message.error(news.data.msg)
          }
        }
        refetch()
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
