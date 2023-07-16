import express from "express"
import md5 from "blueimp-md5"
import { UserModel } from "../models/users.js"
import { RoleModel } from "../models/roles.js"

const router = express.Router()

const filter = { password: 0, __v: 0 }

router.post('/login', async (req, res) => {
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
    const { username, password, role, area } = req.body
    try {
        const user = await UserModel.findOne({ username })
        if (user) {
            res.send({ code: 1, msg: 'User existed' })
        } else {
            const newUser = new UserModel({
                username,
                role,
                area,
                register_time: Date.now(),
                password: md5(password)
            })
            const user = await newUser.save()
            res.send({ code: 0, data: { _id: user._id, username, role, area, register_time: user.register_time, password: user.password } })
        }
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.post('/user/delete', async (req, res) => {
    const { userId } = req.body
    try {
        await UserModel.deleteOne({ _id: userId })
        res.send({ code: 0 })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.post('/user/update', async (req, res) => {
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

router.get('/user/list', async (_, res) => {
    try {
        const users = await UserModel.find()
        res.send({ code: 0, data: users })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.get('/role/list', async (_, res) => {
    try {
        const roles = await RoleModel.find()
        res.send({ code: 0, data: roles })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.post('/role/add-role', async (req, res) => {
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

router.post('/role/add-permission', async (req, res) => {
    const { role_name, auth_name, menus } = req.body
    try {
        const role = await RoleModel.findOne({ role_name })
        if (role) {
            role.auth_name = auth_name
            role.menus = menus
            role.auth_time = Date.now()
            role.save()
            res.send({ code: 0, data: role })
        } else {
            res.send({ code: 1, msg: 'Something went wrong, please try again' })
        }
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.get('/role/auth', async (req, res) => {
    const { role_name } = req.query
    try {
        const role = await RoleModel.findOne({ role_name })
        res.send({ code: 0, data: role })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

export default router