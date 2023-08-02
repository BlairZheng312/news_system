import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Descriptions, Button, Divider } from 'antd';
import { ArrowLeftOutlined, HeartTwoTone } from '@ant-design/icons';
import { useGetNewsQuery, useAddNewsMutation } from '../../../../store/requestApi';
import categoryList from '../../../../config/news_category';
import publishMap from '../../../../config/review_publish';

export default function Preview(props) {
  // get news path from routing path
  const location = useLocation()
  const newsId = location.pathname.split('/').slice(-1)[0]
  const [newsDetail, setNewsDetail] = useState(null)
  const navigate = useNavigate()

  // decide whether to show news in visitor view or management preview view
  const { visitorEntry } = props

  // to store view and star state
  const [view, setView] = useState(0)
  const [star, setStar] = useState(0)

  // fetch news detail, init view & star, update view
  const { data, isSuccess } = useGetNewsQuery(newsId)
  const [addNews] = useAddNewsMutation()
  useEffect(() => {
    isSuccess && setNewsDetail(data.data)
    isSuccess && visitorEntry && setView(data.data.view + 1)
    isSuccess && visitorEntry && setStar(data.data.star)
    isSuccess && visitorEntry && addNews({
      _id: data.data._id,
      view: data.data.view + 1
    })
  }, [isSuccess, data, addNews, visitorEntry])

  // update star
  const handleStar = () => {
    setStar(star + 1)
    addNews({
      _id: newsDetail._id,
      star: star + 1
    })
  }

  return (
    <>
      {newsDetail &&
        <div>
          <Button icon={< ArrowLeftOutlined />} onClick={() => navigate(-1)} />
          <span style={{ margin: '0px 20px', fontWeight: 'bold' }}> {newsDetail.title}</span>
          {visitorEntry && <HeartTwoTone twoToneColor="red" onClick={() => handleStar()} />}
          <Divider />
          <Descriptions column={4}>
            <Descriptions.Item label="Author">{newsDetail.author}</Descriptions.Item>
            <Descriptions.Item label="Category">{categoryList.filter(item => item.id === +newsDetail.category)[0].name}</Descriptions.Item>
            <Descriptions.Item label="Area">{newsDetail.area}</Descriptions.Item>
            {!visitorEntry && <Descriptions.Item label="Publish Status">{publishMap[newsDetail.publishState][0]}</Descriptions.Item>}
            <Descriptions.Item label="Publish Time">{newsDetail.publishTime ? new Date(newsDetail.publishTime).toDateString() : '-'}</Descriptions.Item>
            <Descriptions.Item label="Views">{visitorEntry ? view : newsDetail.view}</Descriptions.Item>
            <Descriptions.Item label="Stars">{visitorEntry ? star : newsDetail.star}</Descriptions.Item>
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



