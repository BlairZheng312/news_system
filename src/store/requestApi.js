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
            getUserList: build.query({
                query() {
                    return {
                        url: 'user/list'
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
            addRole: build.mutation({
                query(role) {
                    return {
                        url: 'role/add-role',
                        method: 'post',
                        body: role
                    }
                },
            }),
            addPermission: build.mutation({
                query(role) {
                    return {
                        url: 'role/add-permission',
                        method: 'post',
                        body: role
                    }
                },
            }),
        }
    }
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetUserListQuery,
    useGetRoleListQuery,
    useAddRoleMutation,
    useAddPermissionMutation
} = requestApi

export default requestApi