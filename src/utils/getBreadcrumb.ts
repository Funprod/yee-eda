import { ROUTES } from '~/constants/routes';
import { Category } from '~/query/services/category-api/category-api.type';
import { GetMeResponse } from '~/query/services/users-api/users-api.type';

import { generatePageTitles } from './generatePageTitles';

type BreadcrumbItem = { label: string; to: string };

type getBreadcrumbProps = {
    categoryData?: Category[];
    pathnames?: string[];
    id?: string;
    recipeData?: { _id: string; title: string };
    profileData?: GetMeResponse;
    draftId?: string;
};

export function getBreadcrumb({
    categoryData,
    pathnames,
    id,
    recipeData,
    profileData,
    draftId,
}: getBreadcrumbProps): {
    breadcrumbItems?: BreadcrumbItem[];
    pageTitles: Record<string, string>;
} {
    const dataCategories = Array.isArray(categoryData)
        ? categoryData.filter((item: Category) => item.subCategories)
        : [];

    const dataSubCategories = Array.isArray(categoryData)
        ? categoryData.filter((item) => !item.subCategories)
        : [];

    const pageTitles = generatePageTitles(dataCategories, dataSubCategories);

    const breadcrumbItems = pathnames?.reduce<BreadcrumbItem[]>((acc, path, index) => {
        const fullPath = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        if (fullPath === ROUTES.JUICIEST) {
            acc.push({ label: 'Самое сочное', to: fullPath });
            return acc;
        }
        if (fullPath === ROUTES.NEW_RECIPE) {
            acc.push({ label: 'Новый рецепт', to: fullPath });
            return acc;
        }

        if (fullPath === ROUTES.BLOGS) {
            acc.push({ label: 'Блоги', to: fullPath });
            return acc;
        }
        if (fullPath === ROUTES.PROFILE) {
            acc.push({ label: 'Мой профиль', to: fullPath });
            return acc;
        }
        if (fullPath === `${ROUTES.PROFILE}${ROUTES.SETTINGS}`) {
            acc.push({ label: 'Настройки', to: fullPath });
            return acc;
        }
        if (fullPath.startsWith(ROUTES.EDIT_DRAFT)) {
            const title = profileData?.drafts.find((item) => item._id === draftId)?.title;
            if (acc.length > 0 && acc[acc.length - 1].label === title) {
                return acc;
            }
            acc.push({ label: title!, to: fullPath });
            return acc;
        }

        if (isLast) {
            if (id && recipeData && recipeData._id === id) {
                acc.push({ label: recipeData.title, to: fullPath });
                return acc;
            }
        }

        acc.push({ label: pageTitles[fullPath] || path, to: fullPath });
        return acc;
    }, []);

    return { breadcrumbItems, pageTitles };
}
