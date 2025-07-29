import { useSelector } from 'react-redux';

import { Category } from '~/query/services/category-api/category-api.type';
import { categoriesSelector } from '~/store/app-slice';

export const useCategoryData = (): Category[] => {
    const categoryDataRedux = useSelector(categoriesSelector);

    const localDataString = localStorage.getItem('cachedCategories');
    const categoryDataLocal = localDataString ? JSON.parse(localDataString) : [];

    const categoryData = categoryDataRedux?.length > 0 ? categoryDataRedux : categoryDataLocal;

    return categoryData;
};
