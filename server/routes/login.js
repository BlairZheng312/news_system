import express from "express"
import md5 from "blueimp-md5"
import { UserModel } from "../models/users.js"
import { RoleModel } from "../models/roles.js"
import jwt from 'jsonwebtoken'
import verifyToken from "../tokenAuth.js"

const router = express.Router()

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await UserModel.findOne({ username, password: md5(password) }, { password: 0, __v: 0 })
        if (user) {
            const token = jwt.sign({username}, 'tokenKey', {expiresIn: '1d'})
            res.send({ code: 0, data: {...user._doc, token} })
        } else {
            res.send({ code: 1, msg: 'Username or password incorrect, please try again' })
        }
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.post('/register', verifyToken, async (req, res) => {
    const { username, password, role, area } = req.body
    try {
        const user = await UserModel.findOne({ username })
        const roleInfo = await RoleModel.findOne({role_name: role})
        if (user) {
            res.send({ code: 1, msg: 'User existed' })
        } else {
            const newUser = new UserModel({
                username,
                role,
                role_permission: roleInfo.menus,
                area,
                register_time: Date.now(),
                password: md5(password)
            })
            const user = await newUser.save()
            res.send({ code: 0, data: { _id: user._id, username, role, role_permission: user.role_permission,area, register_time: user.register_time, password: user.password } })
        }
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

export default router