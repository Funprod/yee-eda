import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from '~/query/baseQueryWithAuth';
import { Tags } from '~/query/constants/tags';

import {
    GetBloggerByIdRequest,
    GetBloggerByIdResponse,
    GetBloggersRequest,
    GetBloggersResponse,
    SubscriptionRequest,
} from './bloggers-api.type';

export const bloggersApi = createApi({
    reducerPath: 'bloggersApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: [Tags.BLOGGERS],
    endpoints: (builder) => ({
        getBloggers: builder.query<GetBloggersResponse, GetBloggersRequest>({
            query: (params) => ({
                url: 'bloggers',
                method: 'GET',
                params,
            }),
            providesTags: [Tags.BLOGGERS],
        }),
        getBloggerById: builder.query<GetBloggerByIdResponse, GetBloggerByIdRequest>({
            query: ({ bloggerId, currentUserId }) => ({
                url: `bloggers/${bloggerId}`,
                method: 'GET',
                params: { currentUserId },
            }),
        }),
        subscription: builder.mutation<unknown, SubscriptionRequest>({
            query: (body) => ({
                url: 'users/toggle-subscription',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: [{ type: Tags.BLOGGERS }],
        }),
    }),
});

export const { useGetBloggersQuery, useGetBloggerByIdQuery, useSubscriptionMutation } = bloggersApi;
