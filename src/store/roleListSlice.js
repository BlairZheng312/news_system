import { createSlice } from '@reduxjs/toolkit'

const roleListSlice = createSlice({
    name: 'roleList',
    initialState: {
        roleList: []
    },
    reducers: {
        setRoleList(state, action) {
            state.roleList = action.payload
        }
    }
})

export const { setRoleList } = roleListSlice.actions
export default roleListSlice