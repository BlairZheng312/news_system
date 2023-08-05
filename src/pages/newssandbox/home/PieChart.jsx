import React, { useEffect, useRef } from 'react'
import _ from 'lodash'
import * as echarts from 'echarts';
import { useGetNewsByVisitQuery } from '../../../store/requestApi';
import categoryList from '../../../config/news_category';
import { useSelector } from 'react-redux';

export default function PieChart() {
    const auth = useSelector(state => state.auth)
    const { data, isSuccess } = useGetNewsByVisitQuery({ user: auth.username })

    useEffect(() => {
        isSuccess && pieChart(_.groupBy(data.data, item => item.category))
    }, [isSuccess, data])

    const chartRef = useRef()

    const pieChart = (data) => {
        const pie = echarts.init(chartRef.current);
        const xName = categoryList.map(item => Object.values(item)[1])
        const xIndex = categoryList.map(item => Object.values(item)[0])

        let list = Object.values(data)
        for (let i in xIndex) {
            if (Object.keys(data).indexOf(i + '') === -1) {
                list.splice(i, 0, [])
            }
        }

        const dataSet = []
        for (let i in list) {
            dataSet.push({
                name: xName[i],
                value: list[i].length
            }
            )
        }

        const colors = ['black', '#e2edfd', '#fbb215', '#ef3c00d8', 'pink', '#006d75'];
        const option = {
            color: colors,
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: dataSet,
                    label: {
                        show: false,
                        position:'center'
                    },
                    center: ['70%', '45%'],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        pie.setOption(option);
    }

    return (
        <div
            ref={chartRef}
            style={{ width: '100%', height: '100%', marginTop: '10px' }}>
        </div>
    )
}


