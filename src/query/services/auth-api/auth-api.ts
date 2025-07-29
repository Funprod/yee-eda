import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithoutAuth } from '~/query/baseQueryWithoutAuth';

import {
    CheckVerificationCodeRequest,
    CheckVerificationCodeResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    loginRequest,
    loginResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    signUpRequest,
    signUpResponse,
} from './auth-api.type';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithoutAuth,
    endpoints: (builder) => ({
        health: builder.mutation<{ echo: string }, { echo: string }>({
            query: (body) => ({
                url: 'health',
                method: 'POST',
                body,
            }),
        }),
        checkAuth: builder.query<void, void>({
            query: () => 'auth/check-auth',
        }),
        signUp: builder.mutation<signUpResponse, signUpRequest>({
            query: (body) => ({
                url: 'auth/signup',
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<loginResponse, loginRequest>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
        }),
        forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
            query: (body) => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body,
            }),
        }),
        checkVerificationCode: builder.mutation<
            CheckVerificationCodeResponse,
            CheckVerificationCodeRequest
        >({
            query: (body) => ({
                url: 'auth/verify-otp',
                method: 'POST',
                body,
            }),
        }),
        resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
            query: (body) => ({
                url: 'auth/reset-password',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useHealthMutation,
    useCheckAuthQuery,
    useSignUpMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useCheckVerificationCodeMutation,
    useResetPasswordMutation,
} = authApi;
