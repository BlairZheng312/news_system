import express from "express"
import md5 from "blueimp-md5"
import { UserModel } from "../models/models.js"
import { RoleModel } from "../models/roles.js"

const router = express.Router()

const filter = { password: 0, __v: 0 }

router.post('/login', express.urlencoded({ extended: true }), async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserModel.findOne({ username, password: md5(password) }, filter)
        if (user) {
            res.send({ code: 0, data: user })
        } else {
            res.send({ code: 1, msg: 'Username or password incorrect, please try again' })
        }
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.post('/register', async (req, res) => {
    const { username, password, confirmPassword, role } = req.body
    try {
        const user = await UserModel.findOne({ username })
        if (password !== confirmPassword) {
            res.send({ code: 1, msg: 'Passwords not match, please try again' })
        } else if (user) {
            res.send({ code: 1, msg: 'User existed' })
        } else {
            const newUser = new UserModel({
                username,
                role,
                password: md5(password)
            })
            const user = await newUser.save()
            res.send({ code: 0, data: { _id: user._id, username, role } })
        }
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.get('/role/list', async (req, res) => {
    try {
        const roles = await RoleModel.find()
        res.send({ code: 0, data: roles })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.post('/role/add', async (req, res) => {
    const { role_name } = req.body
    try {
        const role = await RoleModel.findOne({ role_name })
        if (role) {
            res.send({ code: 1, msg: 'Role existed' })
        } else {
            const newRole = new RoleModel({ role_name })
            const role = await newRole.save()
            res.send({ code: 0, data: role })
        }
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

export default router