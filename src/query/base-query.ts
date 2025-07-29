import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { setAppError } from '~/store/app-slice';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://marathon-api.clevertec.ru/',
    credentials: 'include',
});

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error) {
        const status = result.error?.status;
        const statusCode = typeof status === 'string' ? parseInt(status, 10) : status;
        if (statusCode === 429) {
            await new Promise((resolve) => setTimeout(resolve, 10000));
            result = await rawBaseQuery(args, api, extraOptions);
        }
        if (statusCode === 404) {
            api.dispatch(
                setAppError({
                    title: 'Ошибка сервера',
                    message: 'Попробуйте поискать снова попозже',
                }),
            );
        } else if (statusCode === 500) {
            api.dispatch(
                setAppError({
                    title: 'Ошибка сервера',
                    message: 'Попробуйте поискать снова попозже',
                }),
            );
        } else if (statusCode >= 500) {
            api.dispatch(
                setAppError({
                    title: 'Ошибка сервера',
                    message: 'Попробуйте поискать снова попозже',
                }),
            );
        }
    }

    return result;
};
