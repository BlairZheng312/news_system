const express = require("express")
const app = express()

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