import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authApi } from '~/query/services/auth-api/auth-api';
import { bloggersApi } from '~/query/services/bloggers-api/bloggers-api';
import { profileApi } from '~/query/services/profile-api/profile-api';
import { recipeApi } from '~/query/services/recipe-api/recipe-api';
import { statisticsApi } from '~/query/services/statistics-api/statistics-api';
import { uploadFileApi } from '~/query/services/uploadFile-api/uploadFile-api';
import { usersApi } from '~/query/services/users-api/users-api';

import { categoryApi } from '../query/services/category-api/category-api';
import { apiSlice } from './../query/create-api';
import appReducer, { appSlice } from './app-slice';

const isProduction = false;

const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [uploadFileApi.reducerPath]: uploadFileApi.reducer,
    [bloggersApi.reducerPath]: bloggersApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [statisticsApi.reducerPath]: statisticsApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
});
export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiSlice.middleware,
            categoryApi.middleware,
            recipeApi.middleware,
            authApi.middleware,
            uploadFileApi.middleware,
            bloggersApi.middleware,
            usersApi.middleware,
            statisticsApi.middleware,
            profileApi.middleware,
        ),
    devTools: !isProduction,
});
