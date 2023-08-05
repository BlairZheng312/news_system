import React, { useEffect, useRef } from 'react'
import _ from 'lodash'
import * as echarts from 'echarts';
import { useGetNewsByVisitQuery } from '../../../store/requestApi';
import categoryList from '../../../config/news_category';

export default function BarChart() {
    const { data, isSuccess } = useGetNewsByVisitQuery()

    useEffect(() => {
        isSuccess && barChart(_.groupBy(data.data, item => item.category))
        return () => {
            window.onresize = null
        }
    }, [isSuccess, data])

    const chartRef = useRef()

    const barChart = (data) => {
        const bar = echarts.init(chartRef.current);
        const xName = categoryList.map(item => Object.values(item)[1])
        const xIndex = categoryList.map(item => Object.values(item)[0])

        let list = Object.values(data)
        for (let i in xIndex) {
            if (Object.keys(data).indexOf(i + '') === -1) {
                list.splice(i, 0, [])
            }
        }

        const dataSet = [['Category', 'Published', 'View', 'Star']]
        for (let i in list) {
            dataSet.push([
                xName[i],
                list[i].length,
                list[i].reduce((pre, next) => pre + next.view, 0),
                list[i].reduce((pre, next) => pre + next.star, 0),
            ])
        }

        const colors = ['black', '#e2edfd', '#fbb215'];
        const option = {
            color: colors,
            tooltip: { trigger: 'axis' },
            legend: {
                data: ['Publication', 'Views', 'Stars']
            },
            dataset: {
                source: dataSet
            },
            xAxis: [
                {
                    type: 'category',
                    axisPointer: { type: 'shadow' }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Flow',
                    position: 'right',
                    min: 0,
                    max: 1000,
                    interval: 100,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: 'Publication',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: { formatter: '{value}' }
                }
            ],
            series: [
                {
                    name: 'Publication',
                    type: 'bar',
                    yAxisIndex: 1,
                },
                {
                    name: 'Views',
                    type: 'bar',
                },
                {
                    name: 'Stars',
                    type: 'bar',
                },
            ]
        };

        bar.setOption(option);

        window.onresize = () => {
            bar.resize()
        }
    }

    return (
        <div
            ref={chartRef}
            style={{ width: '100%', height: '300px', marginTop: '30px' }}>
        </div>
    )
}
