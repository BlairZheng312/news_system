import express from "express"
import md5 from "blueimp-md5"
import indexRouter from './routes/index.js'
import { RoleModel } from "./models/roles.js"
import { UserModel } from "./models/users.js"

// init Super Manager role
const superManager = await RoleModel.findOne({ role_name: 'Super Manager' })
if (!superManager) {
    const superManager = new RoleModel({
        role_name: 'Super Manager',
        menus: [
            '/home',
            '/user-manage',
            '/role-manage',
            '/news-manage',
            '/news-manage/compose',
            '/news-manage/draft',
            '/news-manage/category',
            '/review-manage',
            '/review-manage/review',
            '/review-manage/list',
            '/publish-manage',
            '/publish-manage/publish',
            '/publish-manage/withdraw'
        ],
        auth_time: Date.now(),
        auth_name: null
    })
    superManager.save()
}

// init admin user
const adminUser = await UserModel.findOne({ username: 'Admin' })
if (!adminUser) {
    const adminUser = new UserModel({
        username: 'Admin',
        password: md5('admin@123'),
        area: 'Global',
        register_time: Date.now(),
        role: 'Super Manager'
    })
    adminUser.save()
}

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/', indexRouter)

app.listen(8000, (err) => {
    if (!err) console.log("server activated")
})











