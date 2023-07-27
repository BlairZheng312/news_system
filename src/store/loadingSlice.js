import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        loadingStatus: false
    },
    reducers: {
        setLoading(state, action) {
            state.loadingStatus = action.payload
        }
    }
})

export const { setLoading } = loadingSlice.actions
export default loadingSlice