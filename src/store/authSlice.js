import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: () => {
        const username = localStorage.getItem('username')
        if (!username) {
            return {
                username: null,
                role: null,
                role_permission: null,
                area:null,
                isLogin: false,
                expiry: 0
            }
        }
        return {
            username,
            role: localStorage.getItem('role'),
            role_permission: localStorage.getItem('role_permission'),
            area: localStorage.getItem('area'),
            isLogin: true,
            expiry: +localStorage.getItem('expiry')
        }
    },
    reducers: {
        login(state, action) {
            state.username = action.payload.username
            state.role = action.payload.role
            state.role_permission = action.payload.role_permission
            state.area = action.payload.area
            state.isLogin = true
            const currentTime = Date.now()
            const timeout = 1000 * 60 * 60 * 24
            // const timeout = 1000 * 5
            state.expiry = currentTime + timeout

            localStorage.setItem('username', state.username)
            localStorage.setItem('role', state.role)
            localStorage.setItem('role_permission', JSON.stringify(state.role_permission))
            localStorage.setItem('area', state.area)
            localStorage.setItem('expiry', state.expiry + '')
        },
        logout(state) {
            state.username = null
            state.role = null
            state.role_permission = null
            state.area = null
            state.isLogin = false

            localStorage.removeItem('username')
            localStorage.removeItem('role')
            localStorage.removeItem('role_permission')
            localStorage.removeItem('area')
            localStorage.removeItem('expiry')
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice