import React, { useEffect, useState } from 'react'
import { Descriptions, Button } from 'antd';
import {
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router';
import { useGetNewsQuery } from '../../../../store/requestApi';

export default function Preview() {
  // get news path from routing path
  const location = useLocation()
  const newsId = location.pathname.split('/').slice(-1)[0]
  const [newsDetail, setNewsDetail] = useState({})

  // fetch news detail
  const { data, isSuccess } = useGetNewsQuery(newsId)
  useEffect(() => {
    isSuccess && setNewsDetail(data.data)
  }, [isSuccess, data])
  // console.log(newsDetail)
  const navigate = useNavigate()
  return (
    <>
      {newsDetail &&
        <div>
          < Descriptions title={< Button icon={< ArrowLeftOutlined />} onClick={() => navigate(-1)} />}>
            <Descriptions.Item label="Title" > {newsDetail.title}</Descriptions.Item>
            <Descriptions.Item label="Author">{newsDetail.author}</Descriptions.Item>
            <Descriptions.Item label="Category">{newsDetail.category}</Descriptions.Item>
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



