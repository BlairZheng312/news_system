import express from "express"
import { UserModel } from "./db/models.js"
import md5 from "blueimp-md5"

const app = express()

const filter = {password: 0, __v:0}

app.post('/register', express.urlencoded({ extended: true }), async (req, res) => {
    const { username, password, role } = req.body
    const user = await UserModel.findOne({ username })
    if (user) {
        res.send({ code: 1, msg: 'User existed' })
    } else {
        const newUser = new UserModel({
            username,
            role,
            password: md5(password)
        })
        await newUser.save().then((user) => {
            res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 })
            res.send({ code: 0, data: { _id: user._id, username, role } })
        })
    }
})
app.post('/login', express.urlencoded({ extended: true }), async (req, res) => {
    const { username, password } = req.body
    const user = await UserModel.findOne({ username, password: md5(password) }, filter)
    if (user) {
        res.cookie('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 })
        res.send({ code: 0, data: user })
    } else {
        res.send({ code: 1, msg: 'Username or password incorrect, try again' })
    }
})

app.get('/permission', (req, res) => {
    const items = [
        {
            label: 'Home',
            key: '/home',
        },
        {
            label: 'Users',
            key: '/user-manage',
            children: [
                {
                    label: 'User List',
                    key: '/user-manage/user-list'
                }
            ]
        },
        {
            label: 'Permission',
            key: '/permission-manage',
            children: [
                {
                    label: 'Role List',
                    key: 'permission-manage/role-list'
                },
                {
                    label: 'Permission List',
                    key: 'permission-manage/permission-list'
                },
            ]
        },
    ]
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.send(items)
})

app.listen(8000, (err) => {
    if (!err) console.log("server activated")
})