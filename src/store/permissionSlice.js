import { createSlice } from '@reduxjs/toolkit'

const permissionSlice = createSlice({
    name: 'permission',
    initialState: {
        permissionList: []
    },
    reducers: {
        setPermissionList(state, action) {
            state.permissionList = action.payload
        }
    }
})

export const { setPermissionList } = permissionSlice.actions
export default permissionSlice