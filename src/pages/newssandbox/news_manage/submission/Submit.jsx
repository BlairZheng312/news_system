import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Table, Button, Space, Tag, Modal, message } from 'antd';
import { useGetNewsListQuery, useAddNewsMutation } from '../../../../store/requestApi';
import useNotification from '../../../../hooks/useNotification';
import categoryList from '../../../../config/news_category';
import publishMap from '../../../../config/review_publish';

export default function Draft() {
  const navigate = useNavigate()

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
          .filter(item => item[0] > 0)
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
        <Space size="middle" className='news-action'>
          {(news.publishState === 1) &&
            <Button
              onClick={() => { handleWithdrawOrPublish({ news, withdraw: true }) }}
            >Withdraw</Button>}
          {(news.publishState === 2) &&
            <Button
              onClick={() => { navigate('/news-manage/draft/update', { state: { news } }) }}
            >Modify</Button>}
          {(news.publishState === 3) &&
            <Button
              onClick={() => { handleWithdrawOrPublish({ news, withdraw: false }) }}
            >Publish</Button>}
        </Space>
      ),
    },
  ];

  // fetch news list from db
  // user can only see their own news (author === username)
  // all news states except for draft (publishState !==0)
  const [newsList, setNewsList] = useState([])
  const auth = useSelector(state => state.auth)
  const { data, isSuccess, refetch } = useGetNewsListQuery({ author: auth.username })
  useEffect(() => {
    isSuccess && setNewsList(data.data)
  }, [isSuccess, data]);

  // withdraw news from review to draft or publish news
  const [modal, contextHolder] = Modal.useModal()
  const [addNews] = useAddNewsMutation()
  const { openNotification } = useNotification()
  const handleWithdrawOrPublish = ({ news, withdraw }) => {
    modal.confirm({
      title: `Confirm to  ${withdraw ? 'withdraw ' : 'publish '} ${news.title}?`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      async onOk() {
        const confirmInfo = await addNews({
          _id: news._id,
          publishState: withdraw ? 0 : 4,
          publishTime: withdraw ? null : Date.now()
        })
        if (confirmInfo.data.code === 0) {
          openNotification(withdraw ? 2 : 3)
          refetch()
        } else {
          message.error(news.data.msg)
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
