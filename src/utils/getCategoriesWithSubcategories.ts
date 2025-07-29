import { useMemo } from 'react';

import { Category } from '~/query/services/category-api/category-api.type';

function getCategoriesWithSubcategories(categoryDataRedux?: Category[]) {
    try {
        if (categoryDataRedux && categoryDataRedux.length > 0) {
            return categoryDataRedux.filter((item) => item.subCategories);
        }

        const localDataString = localStorage.getItem('cachedCategories');
        if (!localDataString || localDataString === 'undefined') return [];

        const parsed = JSON.parse(localDataString);
        if (!Array.isArray(parsed)) return [];

        return parsed.filter((item: Category) => item.subCategories);
    } catch (error) {
        console.error('Failed to parse cachedCategories:', error);
        return [];
    }
}

export function useCategoriesWithSubcategories(categoryDataRedux?: Category[]) {
    return useMemo(() => getCategoriesWithSubcategories(categoryDataRedux), [categoryDataRedux]);
}
