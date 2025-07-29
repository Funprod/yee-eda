import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetCategoriesQuery } from '~/query/services/category-api/category-api';
import { setCategories } from '~/store/app-slice';
import { ApplicationState } from '~/store/configure-store';

export function useCategories() {
    const dispatch = useDispatch();
    const { data: categoryData, error, isSuccess } = useGetCategoriesQuery();
    const categories = useSelector((state: ApplicationState) => state.app.categories);

    useEffect(() => {
        if (isSuccess && categoryData) {
            dispatch(setCategories(categoryData));
            localStorage.setItem('categories', JSON.stringify(categoryData));
        }

        if (error) {
            const savedCategories = localStorage.getItem('categories');
            if (savedCategories) {
                dispatch(setCategories(JSON.parse(savedCategories)));
            }
        }
    }, [dispatch, categoryData, error, isSuccess]);

    return categories;
}
