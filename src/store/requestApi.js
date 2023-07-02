import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const requestApi = createApi({
    reducerPath: 'requestApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api'
    }),
    endpoints(build) {
        return {
            getSideMenu: build.query({
                query() {
                    return {
                        url: 'permission'
                    }
                },
            }),
            register: build.mutation({
                query(user) {
                    return {
                        url: 'register',
                        method: 'post',
                        body: user
                    }
                },
            }),
            login: build.mutation({
                query(user) {
                    return {
                        url: 'login',
                        method: 'post',
                        body: user
                    }
                },
            }),
        }
    }
})

export const {
    useGetSideMenuQuery,
    useLoginMutation,
    useRegisterMutation
} = requestApi

export default requestApi