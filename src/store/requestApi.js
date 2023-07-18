import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const requestApi = createApi({
    reducerPath: 'requestApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api'
    }),
    keepUnusedDataFor: 0,
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
            deleteUser: build.mutation({
                query(userId) {
                    return {
                        url: 'user/delete',
                        method: 'post',
                        body: userId
                    }
                },
            }),
            updateUser: build.mutation({
                query(user) {
                    return {
                        url: 'user/update',
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
            getRole: build.query({
                query(role_name) {
                    return {
                        url: 'role/auth',
                        params:{role_name}
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
            addNews: build.mutation({
                query(news) {
                    return {
                        url: 'news/add-news',
                        method: 'post',
                        body: news
                    }
                },
            }),
            getNewsList: build.query({
                query(arg) {
                    return {
                        url: 'news/list',
                        params:{...arg}
                    }
                },
            }),
            deleteNews: build.mutation({
                query(newsId) {
                    return {
                        url: 'news/delete',
                        method: 'post',
                        body: newsId
                    }
                },
            }),
        }
    }
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useGetUserListQuery,
    useGetRoleListQuery,
    useGetRoleQuery,
    useAddRoleMutation,
    useAddPermissionMutation,
    useAddNewsMutation,
    useGetNewsListQuery,
    useDeleteNewsMutation
} = requestApi

export default requestApi