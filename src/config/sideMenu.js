import {
    HomeOutlined,
    SmileOutlined,
    TeamOutlined,
    HighlightOutlined,
    EyeOutlined
} from '@ant-design/icons';

const sideMenuItems = [
    {
        label: 'Home',
        key: '/home',
        icon: <HomeOutlined />
    },
    {
        label: 'Users',
        key: '/user-manage',
        icon: <SmileOutlined />
    },
    {
        label: 'Role',
        key: '/role-manage',
        icon: <TeamOutlined />
    },
    {
        label: 'News',
        key: '/news-manage',
        icon: <HighlightOutlined />,
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
        icon: <EyeOutlined />,
        children: [
            {
                label: 'To Review',
                key: '/review-manage/review'
            },
            {
                label: 'Review List',
                key: '/review-manage/list'
            }
        ]
    },
]

export default sideMenuItems