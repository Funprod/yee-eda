import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { setAppError } from '~/store/app-slice';

const createBaseQuery = () =>
    fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
        credentials: 'include',
    });

export const baseQueryWithAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let baseQuery = createBaseQuery();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && (result.error.status === 401 || result.error.status === 403)) {
        try {
            const refreshResponse = await fetch('https://marathon-api.clevertec.ru/auth/refresh', {
                method: 'GET',
                credentials: 'include',
            });

            if (refreshResponse.ok) {
                const newAccessToken = refreshResponse.headers.get('Authentication-Access');

                if (newAccessToken) {
                    localStorage.setItem('accessToken', newAccessToken);
                    baseQuery = createBaseQuery();
                    result = await baseQuery(args, api, extraOptions);
                }
            } else {
                localStorage.removeItem('accessToken');
                api.dispatch(
                    setAppError({
                        title: 'Сессия истекла',
                        message: 'Пожалуйста, войдите снова.',
                    }),
                );
            }
        } catch (e) {
            console.error('Ошибка при попытке обновления токена', e);
        }
    }

    if (result.error?.status === 404 || result.error?.status === 500) {
        api.dispatch(
            setAppError({
                title: 'Ошибка сервера',
                message: 'Попробуйте немного позже.',
            }),
        );
    }

    return result;
};
