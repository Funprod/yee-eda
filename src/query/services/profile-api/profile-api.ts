import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from '~/query/baseQueryWithAuth';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        deleteProfile: builder.mutation<void, void>({
            query: () => ({
                url: 'profile',
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useDeleteProfileMutation } = profileApi;
