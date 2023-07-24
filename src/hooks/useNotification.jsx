import { notification } from 'antd';

export default function useNotification() {
    // open notification for news action
    // 0-save 1-submit 2-withdraw 3-publish
    const openNotification = (finishCode) => {
        let description
        switch (finishCode) {
            case 0:
                description = 'Draft saved successfully, please check in the draft box'
                break
            case 1:
                description = 'News submitted successfully, please wait for further review'
                break
            case 2:
                description = 'News withdrawn successfully, please check in the draft box'
                break
            case 3:
                description = 'News published successfully, please check in the news list'
                break
            default:
                description = ''
        }
        notification.open({
            message: 'Notification',
            description,
            placement: 'bottomRight',
            duration: 3,
            style: { border: '1px solid #fbb215', zIndex: '100' }
        });
    };
    return {
        openNotification
    }
}

