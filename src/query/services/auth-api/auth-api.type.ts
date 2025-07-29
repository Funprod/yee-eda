export type signUpRequest = {
    email: string;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
};

export type signUpResponse = {
    message: string;
    error: string;
    statusCode: number;
};
export type loginRequest = {
    login: string;
    password: string;
};

export type loginResponse = {
    message: string;
    error: string;
    statusCode: number;
};

export type ForgotPasswordRequest = {
    email: string;
};

export type ForgotPasswordResponse = {
    message: string;
    error: string;
    statusCode: number;
};
export type CheckVerificationCodeRequest = {
    email: string;
    otpToken: string;
};

export type CheckVerificationCodeResponse = {
    message: string;
    error: string;
    statusCode: number;
};

export type ResetPasswordRequest = {
    email: string;
    login: string;
    password: string;
    passwordConfirm: string;
};

export type ResetPasswordResponse = {
    message: string;
    error: string;
    statusCode: number;
};
