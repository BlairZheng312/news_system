import express from "express"
import { RoleModel } from "../models/roles.js"
import verifyToken from "../tokenAuth.js"

const router = express.Router()

router.get('/list', verifyToken, async (_, res) => {
    try {
        const roles = await RoleModel.find()
        res.send({ code: 0, data: roles })
    } catch {
        res.send({ code: 1, msg: 'Something went wrong, please try again' })
    }
})

router.post('/add-role', verifyToken, async (req, res) => {
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

router.post('/add-permission', verifyToken, async (req, res) => {
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

export default router