import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { Category } from '~/query/services/category-api/category-api.type';

type Props = {
    category?: string;
    subcategory?: string;
    foundCategory?: Category;
};

export const useRedirectToFirstSubcategory = ({ category, subcategory, foundCategory }: Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (foundCategory && !subcategory && foundCategory.subCategories?.length > 0) {
            const firstSub = foundCategory.subCategories[0];
            navigate(`/${category}/${firstSub.category}`, { replace: true });
        }
    }, [foundCategory, subcategory, navigate, category]);
};
