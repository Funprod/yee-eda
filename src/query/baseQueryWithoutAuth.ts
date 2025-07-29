import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQueryWithoutAuth: BaseQueryFn<
    FetchArgs | string,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
        credentials: 'include',
    });

    const result = await rawBaseQuery(args, api, extraOptions);

    const response = result.meta?.response as Response | undefined;

    if (response) {
        const accessToken = response.headers.get('Authentication-Access');
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
        }
    }

    return result;
};
