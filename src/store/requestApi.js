import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { setLoading } from './loadingSlice'

// set loading state to true before sending request
// set loading state to false after data fetch is done
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    prepareHeaders: (header, { getState }) => {
        const token = getState().auth.token
        if (token) {
            header.set("Authorization", `Bearer ${token}`)
        }
        return header
    }
})
const baseQueryWithLoading = async (args, api, extraOptions) => {
    api.dispatch(setLoading(true))
    const result = await baseQuery(args, api, extraOptions)
    if (result) {
        api.dispatch(setLoading(false))
    }
    return result
}

export const requestApi = createApi({
    reducerPath: 'requestApi',
    baseQuery: baseQueryWithLoading,
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
                        params: { ...arg }
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
            getNews: build.query({
                query(newsId) {
                    return {
                        url: 'news/detail',
                        params: { newsId }
                    }
                },
            }),
            getReviewList: build.query({
                query(arg) {
                    return {
                        url: 'news/review-list',
                        params: { ...arg }
                    }
                },
            }),
            getNewsByVisit: build.query({
                query(arg) {
                    return {
                        url: 'news/sort',
                        params: { ...arg }
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
    useAddRoleMutation,
    useAddPermissionMutation,
    useAddNewsMutation,
    useGetNewsListQuery,
    useDeleteNewsMutation,
    useGetNewsQuery,
    useGetReviewListQuery,
    useGetNewsByVisitQuery
} = requestApi

export default requestApi