import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Button, Space, Modal, message, notification } from 'antd';
import { DeleteOutlined, EditOutlined, SendOutlined } from '@ant-design/icons';
import { useGetNewsListQuery, useDeleteNewsMutation, useAddNewsMutation } from '../../../../store/requestApi';
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
            onClick={() => {
              navigate('update', { state: { news } })
            }}
          />
          <Button
            shape='circle'
            icon={<DeleteOutlined />}
            onClick={() => showConfirm({ news, submit: false })}
            style={{ color: '#ef3c00d8' }}
          />
          <Button
            shape='circle'
            icon={<SendOutlined />}
            style={{ color: '#ef3c00d8' }}
            onClick={() => { showConfirm({ news, submit: true }) }}
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

  // send user delete/submit query & refetch user list
  const [modal, contextHolder] = Modal.useModal();
  const [deleteQuery] = useDeleteNewsMutation()
  const [addNews] = useAddNewsMutation()
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
            reviewState: 1
          })
          if (submitInfo.data.code === 0) {
            openNotification()
          } else {
            message.error(news.data.msg)
          }
        }
        refetch()
      }
    });
  };

  // open notification for news submit
  const openNotification = () => {
    notification.open({
      message: 'Notification',
      description: 'News submitted successfully, please wait for further review',
      placement: 'bottomRight',
      duration: 3,
      style: { border: '1px solid #fbb215', zIndex: '100' }
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
      {/* {submitContextHolder} */}
    </div>
  );
}
