import { createSlice } from '@reduxjs/toolkit'

const collapseSlice = createSlice({
    name: 'collapse',
    initialState: {
        collapseStatus: false
    },
    reducers: {
        setCollapsed(state, action) {
            state.collapseStatus = action.payload
        }
    }
})

export const { setCollapsed } = collapseSlice.actions
export default collapseSlice