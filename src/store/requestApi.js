import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const requestApi = createApi({
    reducerPath: 'requestApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api'
    }),
    endpoints(build) {
        return {
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
            addRole:build.mutation({
                query(role) {
                    return {
                        url: 'role/add',
                        method: 'post',
                        body: role
                    }
                },
            }),
            getRoleList: build.query({
                query() {
                    return {
                        url: 'role/list'
                    }
                },
            }),
        }
    }
})

export const {
    useGetSideMenuQuery,
    useLoginMutation,
    useRegisterMutation,
    useAddRoleMutation,
    useGetRoleListQuery
} = requestApi

export default requestApi