import express from "express"
import { NewsModel } from "../models/news.js"

const router = express.Router()

router.post('/add-news', async (req, res) => {
    const news = req.body
    try {
        if (news._id) {
            const newsFound = await NewsModel.findOneAndUpdate({ _id: news._id }, news, { new: true })
            res.send({ code: 0, data: newsFound })
        } else {
            const newsFound = await NewsModel.findOne({ title: news.title })
            if (newsFound) {
                res.send({ code: 1, msg: 'News title existed, please revise' })
            } else {
                const newNews = new NewsModel(news)
                const addNews = await newNews.save()
                res.send({ code: 0, data: addNews })
            }
        }
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.get('/list', async (req, res) => {
    const { author, publishState } = req.query
    try {
        let newsList
        if (publishState) {
            newsList = await NewsModel.find({ author, publishState })
        } else {
            newsList = await NewsModel.find({ author, publishState: { '$ne': 0 } })
        }
        res.send({ code: 0, data: newsList })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.get('/review-list', async (req, res) => {
    const { area, publishState } = req.query
    try {
        let newsList
        if (area === 'Global') {
            newsList = await NewsModel.find({ publishState: { $in: [...publishState] } })
        } else {
            newsList = await NewsModel.find({ area, publishState: { $in: [...publishState] } })
        }
        res.send({ code: 0, data: newsList })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.post('/delete', async (req, res) => {
    const { newsId } = req.body
    try {
        await NewsModel.deleteOne({ _id: newsId })
        res.send({ code: 0 })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.get('/detail', async (req, res) => {
    const { newsId } = req.query
    try {
        const news = await NewsModel.findOne({ _id: newsId })
        if (news) {
            res.send({ code: 0, data: news })
        } else {
            res.send({ code: 1, msg: 'News not found, please try again' })
        }
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.get('/sort', async (req, res) => {
    const { sortIndex, user } = req.query
    let news
    try {
        if (sortIndex) {
            const sortObj = {}
            sortObj[sortIndex] = -1
            news = await NewsModel.find({ publishState: 4 }).sort(sortObj).limit(6)
        } else if (user) {
            news = await NewsModel.find({ publishState: 4, author: user })
        } else {
            news = await NewsModel.find({ publishState: 4 })
        }
        res.send({ code: 0, data: news })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

export default router