import {
    HomeOutlined,
    SmileOutlined,
    TeamOutlined,
    HighlightOutlined,
    CoffeeOutlined,
    EyeOutlined
} from '@ant-design/icons';

const sideMenuItems = [
    {
        label: 'Home',
        key: '/home',
        icon: <HomeOutlined />,
        isPublic: true
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
                label: 'Submitted',
                key: '/news-manage/submitted'
            }
        ]
    },
    {
        label: 'Review',
        key: '/review-manage',
        icon: <CoffeeOutlined />
    },
    {
        label: 'Publish',
        key: '/publish-manage',
        icon: <EyeOutlined />,
        children: [
            {
                label: 'To Publish',
                key: '/publish-manage/publish'
            },
            {
                label: 'To Withdraw',
                key: '/publish-manage/withdraw'
            }
        ]
    },
]

export default sideMenuItems