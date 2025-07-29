import { jwtDecode } from 'jwt-decode';

type TokenPayload = {
    userId: string;
};

export function getUserIdFromToken(): string {
    const token = localStorage.getItem('accessToken');
    try {
        const decoded = jwtDecode<TokenPayload>(token as string);
        return decoded.userId;
    } catch (error) {
        console.error('Не удалось декодировать токен:', error);
        return 'Не удалось декодировать токен';
    }
}
