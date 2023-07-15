import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: () => {
        const username = localStorage.getItem('username')
        if (!username) {
            return {
                username: null,
                role: null,
                area:null,
                isLogin: false,
                expiry: 0
            }
        }
        return {
            username,
            role: localStorage.getItem('role'),
            area: localStorage.getItem('area'),
            isLogin: true,
            expiry: +localStorage.getItem('expiry')
        }
    },
    reducers: {
        login(state, action) {
            state.username = action.payload.username
            state.role = action.payload.role
            state.area = action.payload.area
            state.isLogin = true
            const currentTime = Date.now()
            const timeout = 1000 * 60 * 60 * 24
            // const timeout = 1000 * 5
            state.expiry = currentTime + timeout

            localStorage.setItem('username', state.username)
            localStorage.setItem('role', state.role)
            localStorage.setItem('area', state.area)
            localStorage.setItem('expiry', state.expiry + '')
        },
        logout(state) {
            state.username = null
            state.role = null
            state.area = null
            state.isLogin = false

            localStorage.removeItem('username')
            localStorage.removeItem('role')
            localStorage.removeItem('area')
            localStorage.removeItem('expiry')
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice