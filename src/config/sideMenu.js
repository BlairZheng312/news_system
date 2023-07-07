const sideMenuItems = [
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
                key: '/permission-manage/role-list'
            },
            {
                label: 'Permission List',
                key: '/permission-manage/permission-list'
            },
        ]
    },
    {
        label: 'News',
        key: '/news-manage',
        children: [
            {
                label: 'To Compose',
                key: '/news-manage/compose'
            },
            {
                label: 'Draft',
                key: '/news-manage/draft'
            },
            {
                label: 'Category',
                key: '/news-manage/category'
            }
        ]
    },
    {
        label: 'Review',
        key: '/review-manage',
        children: [
            {
                label: 'To Review',
                key: '/review-manage/review'
            },
            {
                label: 'List',
                key: '/review-manage/list'
            }
        ]
    },
]

export default sideMenuItems