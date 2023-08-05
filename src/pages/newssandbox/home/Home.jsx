import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Col, Row, List, Avatar, Drawer } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import { useGetNewsByVisitQuery } from '../../../store/requestApi';
import BarChart from './BarChart';
import PieChart from './PieChart';
import cover from './cover.png'

export default function Home() {
  const { Meta } = Card;
  const auth = useSelector(state => state.auth)

  // fetch news list by views & stars (ranking top 6)
  const { data: dataByStar, isSuccess: isSuccessByStar } = useGetNewsByVisitQuery({ sortIndex: 'star' })
  const { data: dataByView, isSuccess: isSuccessByView } = useGetNewsByVisitQuery({ sortIndex: 'view' })

  const [newsByStar, setNewsByStar] = useState([])
  const [newsByView, setNewsByView] = useState([])

  useEffect(() => {
    isSuccessByStar && setNewsByStar(dataByStar.data)
    isSuccessByView && setNewsByView(dataByView.data)
  }, [isSuccessByStar, isSuccessByView, dataByStar, dataByView])

  // control drawer open/close (display user' news info)
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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
            cover={<img alt="cover" src={cover} />}
            actions={[
              <PieChartOutlined key="chart" onClick={showDrawer} />
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
      <BarChart />
      <Drawer title={`${auth.username}' News Publication`} placement="right" onClose={onClose} open={open}>
        <PieChart />
      </Drawer>
    </div>
  )
}







