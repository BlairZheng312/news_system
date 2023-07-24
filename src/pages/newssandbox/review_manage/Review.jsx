import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Button, Space, Modal, message } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useAddNewsMutation, useGetReviewListQuery } from '../../../store/requestApi';
import categoryList from '../../../config/news_category';

export default function Review() {
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
      title: 'Action',
      render: (news) => (
        <Space size="middle" >
          <Button
            shape='circle'
            icon={<CloseOutlined />}
            style={{ color: '#ef3c00d8' }}
            onClick={() => { showConfirm({ news, pass: false }) }}
          />
          <Button
            shape='circle'
            icon={<CheckOutlined />}
            style={{ color: '#ef3c00d8' }}
            onClick={() => { showConfirm({ news, pass: true }) }}
          />
        </Space>
      ),
    },
  ];

  // fetch news list from db 
  // if user's area is global, can see news from all areas
  // otherwize, can only see news within the same area
  // publish state is pending review (publishState === 1)
  const [newsList, setNewsList] = useState([])
  const auth = useSelector(state => state.auth)
  const { data, isSuccess, refetch } = useGetReviewListQuery({ area: auth.area, publishState: 1 })
  useEffect(() => {
    isSuccess && setNewsList(data.data)
  }, [isSuccess, data]);

  // send user delete/submit query & refetch user list
  const [modal, contextHolder] = Modal.useModal();
  const [addNews] = useAddNewsMutation()
  const showConfirm = ({ news, pass }) => {
    modal.confirm({
      title: `Confirm to ${pass ? 'approve' : 'fail'} ${news.title}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      async onOk() {
        let confirmInfo
        if (pass) {
          confirmInfo = await addNews({
            _id: news._id,
            publishState: 3
          })
        } else {
          confirmInfo = await addNews({
            _id: news._id,
            publishState: 2
          })
          if (confirmInfo.data.code === 0) {
            message.success(`${pass ? 'News approved proceeded' : 'News failed proceeded'}`)
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
