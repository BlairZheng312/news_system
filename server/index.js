import express from "express"
import indexRouter from './routes/index.js'
import { RoleModel } from "./models/roles.js"

// init Super Manager role
const superManager = await RoleModel.findOne({role_name:'Super Manager'})
if(!superManager){
    const superManager = new RoleModel({
        role_name: 'Super Manager',
        menus:[
            '/home', 
            '/user-manage', 
            '/role-manage', 
            '/news-manage', 
            '/news-manage/compose',
            '/news-manage/draft',
            '/news-manage/category',
            '/review-manage',
            '/review-manage/review',
            '/review-manage/list'
        ]
    })
    superManager.save()
}

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/', indexRouter) 

app.listen(8000, (err) => {
    if (!err) console.log("server activated")
})











