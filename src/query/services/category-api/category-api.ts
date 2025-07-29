import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '../../base-query';
import { Category } from './category-api.type';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery,
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => 'category',
            transformResponse: (response: Category[]) => {
                try {
                    localStorage.setItem('cachedCategories', JSON.stringify(response));
                } catch (e) {
                    console.warn('Failed to cache categories', e);
                }
                return response;
            },
        }),
        getCategory: builder.query<Category, string | null>({
            query: (id) => `category/${id}`,
            transformResponse: (response: Category) => {
                try {
                    localStorage.setItem('cachedCategory', JSON.stringify(response));
                } catch (e) {
                    console.warn('Failed to cache category', e);
                }
                return response;
            },
        }),
    }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = categoryApi;
