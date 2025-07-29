import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { Category } from '~/query/services/category-api/category-api.type';

export const useRandomCategory = (categories?: Category[] | null) => {
    const [randomCategory, setRandomCategory] = useState<Category | null>(null);
    const { category } = useParams();
    const hasCategoryChangedRef = useRef<string | undefined>('');

    useEffect(() => {
        if (categories?.length) {
            if (!hasCategoryChangedRef.current || category !== hasCategoryChangedRef.current) {
                const random = categories[Math.floor(Math.random() * categories.length)];
                setRandomCategory(random);
                hasCategoryChangedRef.current = category;
            }
        }
    }, [categories, category]);

    return randomCategory;
};
