import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice';
import { message } from 'antd';

export default function useAutoLogout() {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        let timer
        if (auth.isLogin) {
            const timeout = auth.expiry - Date.now()
            if (timeout < 3000) {
                dispatch(logout())
                message.warning('Session expired, please login again')
                return
            }

            timer = setTimeout(() => {
                dispatch(logout())
                message.warning('Session expired, please login again')
            }, timeout)
        }

        return () => {
            clearTimeout(timer)
        }
    }, [auth, dispatch])

}

