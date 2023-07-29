import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash'
import { Card, Col, Row, List, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, PieChartOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import { useGetNewsByVisitQuery } from '../../../store/requestApi';
import categoryList from '../../../config/news_category';
import cover from './cover.png'

export default function Home() {
  const { data: dataByStar, isSuccess: isSuccessByStar } = useGetNewsByVisitQuery('star')
  const { data: dataByView, isSuccess: isSuccessByView } = useGetNewsByVisitQuery('view')
  const { data, isSuccess } = useGetNewsByVisitQuery()

  const [newsByStar, setNewsByStar] = useState([])
  const [newsByView, setNewsByView] = useState([])

  useEffect(() => {
    isSuccessByStar && setNewsByStar(dataByStar.data)
    isSuccessByView && setNewsByView(dataByView.data)
    isSuccess && barChart(_.groupBy(data.data, item => item.category))
  }, [isSuccessByStar, isSuccessByView, isSuccess, dataByStar, dataByView, data])

  const { Meta } = Card;

  const auth = useSelector(state => state.auth)

  const chartRef = useRef()

  const barChart = (data) => {
    const myChart = echarts.init(chartRef.current);
    const xIndex = categoryList.map(item => Object.values(item)[1])
    const xData = categoryList.map(item => Object.values(item)[0])
    const xValue = xData.map(item => {
      if ((Object.keys(data).indexOf(item + '')) !== -1) {
        return Object.values(data)[Object.keys(data).indexOf(item + '')].length
      } else {
        return 0
      }
    })

    const option = {
      title: {
        text: 'News Category'
      },
      legend: {
        data: ['value']
      },
      xAxis: {
        type: 'category',
        data: xIndex
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'value',
          data: xValue,
          type: 'bar',
          color: '#e2edfd'
        }
      ]
    };
    myChart.setOption(option);
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Most Views" bordered={true}>
            <List
              size="small"
              bordered
              dataSource={newsByView}
              renderItem={(item) => <List.Item>
                <Link to={`/news-manage/draft/${item._id}`}>
                  {item.title}
                </Link>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Most Stars" bordered={true}>
            <List
              size="small"
              bordered
              dataSource={newsByStar}
              renderItem={(item) => <List.Item>
                <Link to={`/news-manage/draft/${item._id}`}>
                  {item.title}
                </Link>
              </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src={cover}
              />
            }
            actions={[
              <PieChartOutlined key="chart" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title={auth.username}
              description={`${auth.area} ${auth.role}`}
            />
          </Card>
        </Col>
      </Row>
      <div ref={chartRef} style={{ width: '100%', height: '300px', marginTop: '30px' }}></div>
    </div>

  )
}





