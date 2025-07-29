import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from '../../baseQueryWithAuth';
import { ENDPOINTS } from '../../constants/endpoints/endpoints-recipe';
import { Tags } from '../../constants/tags';
import {
    CreateRecipe,
    GetRecipeByUserId,
    GetRecipesById,
    GetRecipesParams,
    GetRecipesQueryArgs,
    MeasureUnitsResponse,
    Recipe,
    RecipeData,
} from './recipe-api.type';

export const recipeApi = createApi({
    reducerPath: 'recipeApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: [Tags.RECIPE, Tags.RECIPE_BY_USER],
    endpoints: (builder) => ({
        getRecipes: builder.query<Recipe, Partial<GetRecipesQueryArgs>>({
            query: (params) => ({
                url: ENDPOINTS.RECIPE,
                method: 'GET',
                params,
            }),
            providesTags: [{ type: Tags.RECIPE }],
            transformResponse: (response: Recipe) => {
                try {
                    localStorage.setItem('cachedRecipe', JSON.stringify(response));
                } catch (e) {
                    console.warn('Failed to cache recipe', e);
                }
                return response;
            },
        }),
        getRecipesCategory: builder.query<Recipe, GetRecipesParams>({
            query: (params) => ({
                url: ENDPOINTS.RECIPE_CATEGORY(params.id),
                method: 'GET',
                params,
            }),
            transformResponse: (response: Recipe) => {
                try {
                    localStorage.setItem('cachedRecipeCategory', JSON.stringify(response));
                } catch (e) {
                    console.warn('Failed to cache recipe', e);
                }
                return response;
            },
        }),
        getRecipeById: builder.query<RecipeData, GetRecipesById>({
            query: ({ id }) => ({
                url: ENDPOINTS.RECIPE_BY_ID(id),
                method: 'GET',
            }),
            providesTags: (result, _error, arg) =>
                result ? [{ type: Tags.RECIPE, id: arg.id }] : [],
        }),
        createRecipe: builder.mutation<RecipeData, CreateRecipe>({
            query: (body) => ({
                url: ENDPOINTS.RECIPE,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: Tags.RECIPE }],
        }),
        createDraftRecipe: builder.mutation<RecipeData, CreateRecipe>({
            query: (body) => ({
                url: ENDPOINTS.RECIPE_DRAFT,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: Tags.RECIPE }],
        }),
        measureUnits: builder.query<MeasureUnitsResponse[], void>({
            query: () => ({
                url: ENDPOINTS.MEASURE_UNITS,
                method: 'GET',
            }),
        }),
        likeRecipe: builder.mutation<RecipeData, string>({
            query: (id) => ({
                url: ENDPOINTS.RECIPE_LIKE(id),
                method: 'POST',
            }),
            invalidatesTags: [{ type: Tags.RECIPE }],
        }),
        bookmarkRecipe: builder.mutation<RecipeData, { id: string; userId?: string }>({
            query: ({ id }) => ({
                url: ENDPOINTS.RECIPE_BOOKMARK(id),
                method: 'POST',
            }),
            invalidatesTags: (_result, _error, { userId }) => [
                { type: Tags.RECIPE },
                { type: Tags.RECIPE_BY_USER, id: userId },
            ],
        }),
        editRecipe: builder.mutation<RecipeData, { id: string; body: CreateRecipe }>({
            query: ({ id, body }) => ({
                url: ENDPOINTS.RECIPE_BY_ID(id),
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (_result, error, arg) =>
                error ? [] : [{ type: Tags.RECIPE, id: arg.id }],
        }),
        deleteRecipe: builder.mutation<RecipeData, string>({
            query: (id) => ({
                url: ENDPOINTS.RECIPE_BY_ID(id),
                method: 'DELETE',
            }),
            invalidatesTags: (_result, error, id) =>
                error ? [] : [{ type: Tags.RECIPE, id }, { type: Tags.RECIPE }],
        }),
        getRecipeByUserId: builder.query<GetRecipeByUserId, string>({
            query: (id) => ({
                url: ENDPOINTS.RECIPE_BY_USER_ID(id),
                method: 'GET',
            }),
            providesTags: (result, _error, id) =>
                result ? [{ type: Tags.RECIPE_BY_USER, id }] : [],
        }),
        recommendRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: ENDPOINTS.RECIPE_RECOMMEND_BY_ID(id),
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useGetRecipesCategoryQuery,
    useGetRecipesQuery,
    useGetRecipeByIdQuery,
    useCreateRecipeMutation,
    useCreateDraftRecipeMutation,
    useMeasureUnitsQuery,
    useLikeRecipeMutation,
    useBookmarkRecipeMutation,
    useEditRecipeMutation,
    useDeleteRecipeMutation,
    useGetRecipeByUserIdQuery,
    useRecommendRecipeMutation,
} = recipeApi;
