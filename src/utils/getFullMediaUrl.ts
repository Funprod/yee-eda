import { MEDIA_BASE_URL } from '../query/constants/media-base-url';

export const getFullMediaUrl = (path: string) => {
    if (!path) return '';
    return `${MEDIA_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};
