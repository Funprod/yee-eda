import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { authApi } from '~/query/services/auth-api/auth-api';
import { bloggersApi } from '~/query/services/bloggers-api/bloggers-api';
import { Category } from '~/query/services/category-api/category-api.type';
import { profileApi } from '~/query/services/profile-api/profile-api';
import { recipeApi } from '~/query/services/recipe-api/recipe-api';
import { uploadFileApi } from '~/query/services/uploadFile-api/uploadFile-api';
import { usersApi } from '~/query/services/users-api/users-api';

import { categoryApi } from '../query/services/category-api/category-api';
import { ApplicationState } from './configure-store';

export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    error: null as { title: string; message: string } | null,
    success: null as { title: string; message: string } | null,
    selectedCategoryId: localStorage.getItem('selectedCategoryId') || null,
    categories: [] as Category[],
    recipeId: '',
};
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload }: PayloadAction<{ title: string; message: string } | null>) {
            state.success = null;
            state.error = payload;
        },

        setAppSuccess(
            state,
            { payload }: PayloadAction<{ title: string; message: string } | null>,
        ) {
            state.error = null;
            state.success = payload;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setSelectedCategoryId(state, { payload: categoryId }: PayloadAction<string | null>) {
            state.selectedCategoryId = categoryId;
            if (categoryId) {
                localStorage.setItem('selectedCategoryId', categoryId);
            } else {
                localStorage.removeItem('selectedCategoryId');
            }
        },
        setCategories(state, { payload }: PayloadAction<Category[]>) {
            state.categories = payload;
        },
        setRecipeId(state, { payload }: PayloadAction<string>) {
            state.recipeId = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(categoryApi.endpoints.getCategories.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(
                categoryApi.endpoints.getCategories.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                    state.categories = payload;
                    localStorage.setItem('cachedCategories', JSON.stringify(payload));
                },
            )
            .addMatcher(categoryApi.endpoints.getCategories.matchRejected, (state) => {
                state.isLoading = false;
            })
            .addMatcher(recipeApi.endpoints.getRecipes.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(recipeApi.endpoints.getRecipes.matchFulfilled, (state) => {
                state.isLoading = false;
            })
            .addMatcher(recipeApi.endpoints.getRecipes.matchRejected, (state) => {
                state.isLoading = false;
            })
            .addMatcher(authApi.endpoints.login.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state) => {
                state.isLoading = false;
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
                state.isLoading = false;
            })
            .addMatcher(recipeApi.endpoints.bookmarkRecipe.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(recipeApi.endpoints.bookmarkRecipe.matchFulfilled, (state) => {
                state.isLoading = false;
            })
            .addMatcher(recipeApi.endpoints.bookmarkRecipe.matchRejected, (state) => {
                state.isLoading = false;
            })
            .addMatcher(authApi.endpoints.resetPassword.matchPending, (state) => {
                state.success = {
                    title: '',
                    message: 'Восстановление данных успешно',
                };
            })
            .addMatcher(recipeApi.endpoints.createDraftRecipe.matchRejected, (state, action) => {
                if (action.payload?.status === 409) {
                    state.error = {
                        title: 'Ошибка',
                        message: 'Рецепт с таким названием уже существует',
                    };
                }
                if (action.payload?.status === 500) {
                    state.error = {
                        title: 'Ошибка сервера',
                        message: 'Не удалось сохранить черновик рецепта',
                    };
                }
            })
            .addMatcher(recipeApi.endpoints.createRecipe.matchRejected, (state, action) => {
                if (action.payload?.status === 409) {
                    state.error = {
                        title: 'Ошибка',
                        message: 'Рецепт с таким названием уже существует',
                    };
                }
                if (action.payload?.status === 500) {
                    state.error = {
                        title: 'Ошибка сервера',
                        message: 'Попробуйте пока сохранить в черновик.',
                    };
                }
            })
            .addMatcher(recipeApi.endpoints.editRecipe.matchRejected, (state, action) => {
                if (action.payload?.status === 409) {
                    state.error = {
                        title: 'Ошибка',
                        message: 'Рецепт с таким названием уже существует',
                    };
                }
                if (action.payload?.status === 500) {
                    state.error = {
                        title: 'Ошибка сервера',
                        message: 'Попробуйте пока сохранить в черновик',
                    };
                }
            })

            .addMatcher(recipeApi.endpoints.editRecipe.matchFulfilled, (state) => {
                state.success = {
                    title: '',
                    message: 'Рецепт успешно опубликован',
                };
            })
            .addMatcher(recipeApi.endpoints.deleteRecipe.matchRejected, (state, action) => {
                if (action.payload?.status === 500) {
                    state.error = {
                        title: 'Ошибка сервера',
                        message: 'Не удалось удалить рецепт',
                    };
                }
            })
            .addMatcher(recipeApi.endpoints.deleteRecipe.matchFulfilled, (state) => {
                state.success = {
                    title: '',
                    message: 'Рецепт успешно удален',
                };
            })
            .addMatcher(uploadFileApi.endpoints.uploadFile.matchRejected, (state) => {
                state.error = {
                    title: 'Ошибка сервера',
                    message: 'Попробуйте сохранить фото позже.',
                };
            })
            .addMatcher(bloggersApi.endpoints.getBloggers.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(bloggersApi.endpoints.getBloggers.matchFulfilled, (state) => {
                state.isLoading = false;
            })
            .addMatcher(bloggersApi.endpoints.getBloggers.matchRejected, (state) => {
                state.isLoading = false;
            })
            .addMatcher(bloggersApi.endpoints.getBloggerById.matchRejected, (state) => {
                state.error = {
                    title: 'Ошибка сервера',
                    message: 'Попробуйте немного позже.',
                };
            })
            .addMatcher(bloggersApi.endpoints.getBloggerById.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(bloggersApi.endpoints.getBloggerById.matchFulfilled, (state) => {
                state.isLoading = false;
            })
            .addMatcher(bloggersApi.endpoints.getBloggerById.matchRejected, (state) => {
                state.isLoading = false;
            })
            .addMatcher(usersApi.endpoints.createNote.matchFulfilled, (state) => {
                state.success = {
                    title: '',
                    message: 'Заметка опубликована',
                };
            })
            .addMatcher(usersApi.endpoints.createNote.matchRejected, (state) => {
                state.error = {
                    title: 'Ошибка сервера',
                    message: 'Попробуйте позже.',
                };
            })
            .addMatcher(usersApi.endpoints.deleteNoteById.matchFulfilled, (state) => {
                state.success = {
                    title: '',
                    message: 'Заметка удалена',
                };
            })
            .addMatcher(usersApi.endpoints.deleteNoteById.matchRejected, (state) => {
                state.error = {
                    title: 'Ошибка сервера',
                    message: 'Попробуйте позже',
                };
            })
            .addMatcher(usersApi.endpoints.updateInfo.matchFulfilled, (state) => {
                state.success = {
                    title: '',
                    message: 'Изменения сохранены',
                };
            })
            .addMatcher(usersApi.endpoints.updateInfo.matchRejected, (state) => {
                state.error = {
                    title: 'Ошибка сервера',
                    message: 'Попробуйте позже',
                };
            })
            .addMatcher(usersApi.endpoints.updatePassword.matchRejected, (state, action) => {
                const message = (action.payload?.data as { message?: string })?.message;
                if (action.payload?.status === 400) {
                    state.error = {
                        title: message || '',
                        message: 'Попробуйте снова',
                    };
                }
                if (action.payload?.status === 500) {
                    state.error = {
                        title: 'Ошибка сервера',
                        message: 'Попробуйте немного позже',
                    };
                }
            })
            .addMatcher(usersApi.endpoints.updatePassword.matchFulfilled, (state) => {
                state.success = {
                    title: '',
                    message: 'Пароль успешно изменен',
                };
            })
            .addMatcher(usersApi.endpoints.updatePassword.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(usersApi.endpoints.updatePassword.matchFulfilled, (state) => {
                state.isLoading = false;
            })
            .addMatcher(usersApi.endpoints.updatePassword.matchRejected, (state) => {
                state.isLoading = false;
            })
            .addMatcher(profileApi.endpoints.deleteProfile.matchPending, (state) => {
                state.isLoading = true;
            })
            .addMatcher(profileApi.endpoints.deleteProfile.matchFulfilled, (state) => {
                state.isLoading = false;
            })
            .addMatcher(profileApi.endpoints.deleteProfile.matchRejected, (state) => {
                state.isLoading = false;
            })
            .addMatcher(profileApi.endpoints.deleteProfile.matchFulfilled, (state) => {
                localStorage.removeItem('accessToken');
                state.success = {
                    title: '',
                    message: 'Аккаунт удален',
                };
            })
            .addMatcher(profileApi.endpoints.deleteProfile.matchRejected, (state) => {
                state.error = {
                    title: 'Ошибка сервера',
                    message: 'Попробуйте позже',
                };
            });
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;
export const userSuccessSelector = (state: ApplicationState) => state.app.success;
export const selectedCategoryIdSelector = (state: ApplicationState) => state.app.selectedCategoryId;
export const categoriesSelector = (state: ApplicationState) => state.app.categories;
export const recipeIdSelector = (state: ApplicationState) => state.app.recipeId;

export const {
    setAppError,
    setAppLoader,
    setSelectedCategoryId,
    setCategories,
    setAppSuccess,
    setRecipeId,
} = appSlice.actions;
export default appSlice.reducer;
