import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Steps, Button, Form, message, notification } from 'antd';
import { useAddNewsMutation } from '../../../../store/requestApi';
import NewsInfo from './NewsInfo';
import NewsContent from './NewsContent';
import NewsReview from './NewsReview';
import '../index.css'

export default function Draft() {
    // control current step
    const [current, setCurrent] = useState(0)

    // collect news info (title & category)
    const [form] = Form.useForm()

    const [newsInfo, setNewsInfo] = useState({})
    const [newsContent, setNewsContent] = useState('')

    // handle previous/next button click event
    const handleNext = async () => {
        if (current === 0) {
            try {
                const newsInfo = await form.validateFields()
                if (newsInfo) {
                    setCurrent(current + 1)
                    setNewsInfo(newsInfo)
                }
            } catch {
                message.error('Please type in news title & category')
            }
        } else {
            setCurrent(current + 1)
        }
    }

    const handlePrevious = () => {
        setCurrent(current - 1)
    }

    // handle news save/submit
    const [addNews] = useAddNewsMutation()
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()
    const handleFinish = async (finishCode) => {
        const news = await addNews({
            title: newsInfo.title,
            category: newsInfo.category,
            content: newsContent,
            author: auth.username,
            author_role: auth.role,
            area: auth.area,
            reviewState: finishCode,
            publishState: 0,
            view: 0,
            star: 0
        })
        if (news.data.code === 0) {
            openNotification(finishCode)
            navigate(`${finishCode ? '/news-manage/category' : '/news-manage/draft'}`)
        } else {
            message.error(news.data.msg)
        }
    }
    const openNotification = (finishCode) => {
        notification.open({
            message: 'Notification',
            description: `${finishCode === 0 ?
                'Draft saved successfully, please check in the draft box' :
                'News submitted successfully, please wait for further review'}`,
            placement: 'bottomRight',
            duration:3,
            style: { border: '1px solid #fbb215', zIndex: '100' }
        });
    };

    return (
        <>
            <Steps
                current={current}
                items={[
                    {
                        title: 'Information',
                        description: 'news title & category',
                    },
                    {
                        title: 'Content',
                        description: 'news content',
                    },
                    {
                        title: 'Review',
                        description: 'save or submit',
                    },
                ]}
            />
            <div className={current === 0 ? 'show' : 'hidden'}>
                <NewsInfo form={form} />
            </div>
            <div className={current === 1 ? 'show' : 'hidden'}>
                <NewsContent getNewsContent={newsContent => setNewsContent(newsContent)} />
            </div>
            <div className={current === 2 ? 'show' : 'hidden'}>
                <NewsReview news={{...newsInfo,newsContent}}/>
            </div>
            <div className='stepControl'>
                {current > 0 && <Button onClick={handlePrevious}>Previous</Button>}
                {current === 2 && <>
                    <Button onClick={() => handleFinish(0)} type='primary'>Save</Button>
                    <Button onClick={() => handleFinish(1)} type='primary'>Submit</Button>
                </>}
                {current < 2 && <Button onClick={handleNext} type='primary'>Next</Button>}
            </div>
        </>


    )
}
