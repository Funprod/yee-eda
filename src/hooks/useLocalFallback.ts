export const useLocalFallback = <T>(
    key: string,
    isError: boolean,
    primaryData: T | null | undefined,
): T | null => {
    if (!isError || primaryData) return primaryData ?? null;

    try {
        const cached = localStorage.getItem(key);
        return cached ? (JSON.parse(cached) as T) : null;
    } catch (e) {
        console.error(`Error reading ${key} from localStorage:`, e);
        return null;
    }
};
