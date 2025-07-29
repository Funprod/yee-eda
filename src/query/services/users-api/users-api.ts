import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from '~/query/baseQueryWithAuth';
import { ENDPOINTS_USERS } from '~/query/constants/endpoints/endpoints-users';

import {
    GetAllUsersResponse,
    GetMeResponse,
    Note,
    UpdatePasswordRequest,
    UpdateUserInfoRequest,
} from './users-api.type';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['users'],
    endpoints: (builder) => ({
        getMe: builder.query<GetMeResponse, void>({
            query: () => ENDPOINTS_USERS.USERS_ME,
            providesTags: ['users'],
        }),
        getAllUsers: builder.query<GetAllUsersResponse[], void>({
            query: () => ENDPOINTS_USERS.USERS_ALL,
        }),
        createNote: builder.mutation<Note, { text: string }>({
            query: ({ text }) => ({
                url: ENDPOINTS_USERS.CREATE_NOTE,
                method: 'POST',
                body: { text },
            }),
            invalidatesTags: ['users'],
        }),
        deleteNoteById: builder.mutation<void, string>({
            query: (id) => ({
                url: ENDPOINTS_USERS.DELETE_NOTE_BY_ID(id),
                method: 'DELETE',
            }),
            invalidatesTags: ['users'],
        }),
        updatePhoto: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: ENDPOINTS_USERS.UPDATE_PHOTO,
                method: 'POST',
                body: formData,
            }),
            invalidatesTags: ['users'],
        }),
        updateInfo: builder.mutation<void, UpdateUserInfoRequest>({
            query: (formData) => ({
                url: ENDPOINTS_USERS.UPDATE_INFO,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['users'],
        }),
        updatePassword: builder.mutation<void, UpdatePasswordRequest>({
            query: (formData) => ({
                url: ENDPOINTS_USERS.UPDATE_PASSWORD,
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['users'],
        }),
    }),
});

export const {
    useGetMeQuery,
    useGetAllUsersQuery,
    useCreateNoteMutation,
    useDeleteNoteByIdMutation,
    useUpdatePhotoMutation,
    useUpdateInfoMutation,
    useUpdatePasswordMutation,
} = usersApi;
