import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { Category } from '~/query/services/category-api/category-api.type';

type UseValidateCategoryProps = {
    foundCategory?: Category;
    category?: string;
    subcategory?: string;
};

export const useValidateCategory = ({
    foundCategory,
    category,
    subcategory,
}: UseValidateCategoryProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        const isCategoryValid = Boolean(foundCategory);

        const isSubcategoryValid = subcategory
            ? foundCategory?.subCategories?.some((sub) => sub.category === subcategory)
            : true;

        if (!isCategoryValid || !isSubcategoryValid) {
            navigate(ROUTES.NOT_FOUND, { replace: true });
        }
    }, [foundCategory, category, subcategory, navigate]);
};
