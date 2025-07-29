export const ENDPOINTS_USERS = {
    USERS_ME: 'users/me',
    USERS_ALL: 'users/all',
    CREATE_NOTE: 'users/me/note',
    DELETE_NOTE_BY_ID: (noteId: string) => `users/me/note/${noteId}`,
    UPDATE_PHOTO: 'users/me/photo',
    UPDATE_INFO: 'users/me/update-info',
    UPDATE_PASSWORD: 'users/me/update-password',
};
