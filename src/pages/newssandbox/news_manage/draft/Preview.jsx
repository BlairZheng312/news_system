import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Descriptions, Button, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useGetNewsQuery } from '../../../../store/requestApi';
import categoryList from '../../../../config/news_category';

export default function Preview() {
  // get news path from routing path
  const location = useLocation()
  const newsId = location.pathname.split('/').slice(-1)[0]
  const [newsDetail, setNewsDetail] = useState(null)

  // fetch news detail
  const { data, isSuccess } = useGetNewsQuery(newsId)
  useEffect(() => {
    isSuccess && setNewsDetail(data.data)
  }, [isSuccess, data])

  const navigate = useNavigate()
  
  return (
    <>
      {newsDetail &&
        <div>
          < Button icon={< ArrowLeftOutlined />} onClick={() => navigate(-1)} />
          <Divider />
          < Descriptions>
            <Descriptions.Item label="Title" > {newsDetail.title}</Descriptions.Item>
            <Descriptions.Item label="Author">{newsDetail.author}</Descriptions.Item>
            <Descriptions.Item label="Category">{categoryList.filter(item => item.id === +newsDetail.category)[0].name}</Descriptions.Item>
            <Descriptions.Item label="Area">{newsDetail.area}</Descriptions.Item>
            <Descriptions.Item label="Review Status">{newsDetail.reviewState}</Descriptions.Item>
            <Descriptions.Item label="Publish Status">{newsDetail.publishState}</Descriptions.Item>
            <Descriptions.Item label="Views">{newsDetail.view}</Descriptions.Item>
            <Descriptions.Item label="Likes">{newsDetail.star}</Descriptions.Item>
          </Descriptions >
          <div
            dangerouslySetInnerHTML={{
              __html: newsDetail.content
            }}
            style={{
              border: 'solid 1px lightgrey',
              padding: '12px',
              width: '100%',
              minHeight: '200px',
            }}
          ></div>
        </div>}
    </>
  )
}



