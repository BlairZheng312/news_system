import express from "express"
import { UserModel } from "../models/users.js"

const router = express.Router()

router.post('/delete', async (req, res) => {
    const { userId } = req.body
    try {
        await UserModel.deleteOne({ _id: userId })
        res.send({ code: 0 })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.post('/update', async (req, res) => {
    const user = req.body
    try {
        const newUser = await UserModel.findOneAndUpdate({ username: user.username }, user, { new: true })
        if (newUser) {
            res.send({ code: 0, data: newUser })
        }
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.get('/list', async (_, res) => {
    try {
        const users = await UserModel.find()
        res.send({ code: 0, data: users })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

export default router