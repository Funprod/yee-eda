import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

type ErrorResponse = {
    message: string;
    error: string;
    statusCode: number;
};

export function isFetchBaseQueryErrorWithMessage(
    error: unknown,
): error is FetchBaseQueryError & { data: ErrorResponse } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        'data' in error &&
        typeof (error as FetchBaseQueryError & { data?: unknown }).data === 'object' &&
        error.data !== null &&
        'message' in (error.data as Record<string, unknown>) &&
        typeof (error.data as Record<string, unknown>).message === 'string'
    );
}
