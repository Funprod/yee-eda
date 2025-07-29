import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithAuth } from '../../baseQueryWithAuth';

type UploadFileResponse = {
    name: string;
    url: string;
    _id: string;
};

export const uploadFileApi = createApi({
    reducerPath: 'uploadFileApi',
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        uploadFile: builder.mutation<UploadFileResponse, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: 'file/upload',
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const { useUploadFileMutation } = uploadFileApi;
