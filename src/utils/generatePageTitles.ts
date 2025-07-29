import { Category } from '~/query/services/category-api/category-api.type';

export const generatePageTitles = (
    dataCategories: Category[] | undefined,
    dataSubCategories: Category[] | undefined,
): Record<string, string> => {
    const pageTitles: Record<string, string> = {};
    dataCategories?.forEach((category) => {
        pageTitles[`/${category.category}`] = category.title;
        const categorySubcategories = Array.isArray(dataSubCategories)
            ? dataSubCategories.filter((sub) => sub.rootCategoryId === category._id)
            : [];
        categorySubcategories?.forEach((subcategory) => {
            pageTitles[`/${category.category}/${subcategory.category}`] = `${subcategory.title}`;
        });
    });

    return pageTitles;
};
