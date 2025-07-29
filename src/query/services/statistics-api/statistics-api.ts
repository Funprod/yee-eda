import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from '~/query/baseQueryWithAuth';

import { getStatisticsResponse } from './statistics-api.type';

export const statisticsApi = createApi({
    reducerPath: 'statisticsApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getStatistic: builder.query<getStatisticsResponse, void>({
            query: () => 'statistic',
        }),
    }),
});

export const { useGetStatisticQuery } = statisticsApi;
