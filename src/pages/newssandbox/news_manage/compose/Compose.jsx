import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Steps, Button, Form, message } from 'antd';
import { useAddNewsMutation } from '../../../../store/requestApi';
import useNotification from '../../../../hooks/useNotification';
import NewsInfo from './NewsInfo';
import NewsContent from './NewsContent';
import NewsReview from './NewsReview';

export default function Draft(props) {
    // accept saved news for news update
    const { news: newsOrigin } = props

    // control current step
    const [current, setCurrent] = useState(0)

    // collect news info (title & category)
    const [form] = Form.useForm()
    const [newsInfo, setNewsInfo] = useState(null)

    // collect news info (content)
    const [newsContent, setNewsContent] = useState(newsOrigin ? newsOrigin.content : '')

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
    const { openNotification } = useNotification()
    const [addNews] = useAddNewsMutation()
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()
    const handleFinish = async (finishCode) => {
        const news = await addNews({
            _id: newsOrigin ? newsOrigin._id : null,
            title: newsInfo.title,
            category: newsInfo.category,
            content: newsContent,
            author: auth.username,
            author_role: auth.role,
            area: auth.area,
            publishState: finishCode,
            publishTime: null,
            view: 0,
            star: 0
        })
        if (news.data.code === 0) {
            openNotification(finishCode)
            navigate(`${finishCode ? '/news-manage/submitted' : '/news-manage/draft'}`)
        } else {
            message.error(news.data.msg)
        }
    }

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
                <NewsInfo form={form} news={newsOrigin} />
            </div>
            <div className={current === 1 ? 'show' : 'hidden'}>
                <NewsContent news={newsOrigin} getNewsContent={newsContent => setNewsContent(newsContent)} />
            </div>
            <div className={current === 2 ? 'show' : 'hidden'}>
                <NewsReview news={{ ...newsInfo, newsContent }} />
            </div>
            <div className='step-control news-action'>
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
