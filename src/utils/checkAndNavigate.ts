import { Category } from '~/query/services/category-api/category-api.type';

type CheckAndNavigateProps = {
    categoriesIds: string[];
    categoryData: Category[];
};

export const checkAndNavigate = ({ categoryData, categoriesIds }: CheckAndNavigateProps) => {
    let matchedCategory: Category | undefined;
    let matchedSubcategory: { _id: string; category: string } | undefined;

    for (const category of categoryData) {
        if (!category.subCategories) continue;

        for (const sub of category.subCategories) {
            if (categoriesIds.includes(sub._id)) {
                matchedCategory = category;
                matchedSubcategory = sub;
                break;
            }
        }

        if (matchedSubcategory) break;
    }

    const condition = !matchedCategory || !matchedSubcategory;

    return { condition, matchedCategory, matchedSubcategory };
};
