import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { useGetBloggerByIdQuery } from '~/query/services/bloggers-api/bloggers-api';
import { useGetRecipeByIdQuery } from '~/query/services/recipe-api/recipe-api';
import { useGetMeQuery } from '~/query/services/users-api/users-api';
import { categoriesSelector, recipeIdSelector } from '~/store/app-slice';
import { getBreadcrumb } from '~/utils/getBreadcrumb';
import { getUserIdFromToken } from '~/utils/getUserIdFromToken';

export const useBreadcrumbs = () => {
    const location = useLocation();
    const { id, userId, draftId } = useParams();
    const rawPathnames = location.pathname.split('/').filter(Boolean);

    const pathnames = rawPathnames[0] === 'edit-recipe' ? rawPathnames.slice(1) : rawPathnames;

    const recipeId = useSelector(recipeIdSelector);
    const categoryData = useSelector(categoriesSelector);
    const currentUserId = getUserIdFromToken();

    const { data: recipeData } = useGetRecipeByIdQuery(id && id !== recipeId ? { id } : skipToken);
    const { data: profileData } = useGetMeQuery();

    const bloggerId = userId ?? null;
    const { data: bloggerData } = useGetBloggerByIdQuery(
        bloggerId ? { currentUserId, bloggerId } : skipToken,
    );

    const breadcrumbItems = useMemo(() => {
        const { breadcrumbItems } = getBreadcrumb({
            categoryData,
            pathnames,
            id,
            recipeData,
            profileData,
            draftId,
        });

        const updated = breadcrumbItems ?? [];

        updated.unshift({ label: 'Главная', to: ROUTES.HOME });

        const enhanced = updated.map((item, index) => {
            if (index === 0 || index === updated.length - 1) return item;

            const categorySlug = item.to.split('/')[1];
            const category = categoryData.find((cat) => cat.category === categorySlug);

            if (category?.subCategories?.length) {
                const firstSub = category.subCategories[0];
                return {
                    ...item,
                    to: `/${category.category}/${firstSub.category}`,
                };
            }

            return item;
        });

        if (location.pathname.startsWith(`${ROUTES.BLOGS}/`) && bloggerData?.bloggerInfo) {
            const bloggerLabel = `${bloggerData.bloggerInfo.firstName} ${bloggerData.bloggerInfo.lastName} (@${bloggerData.bloggerInfo.login})`;
            const bloggerPath = `${ROUTES.BLOGS}/${bloggerId}`;

            if (enhanced.length) {
                enhanced[enhanced.length - 1] = {
                    label: bloggerLabel,
                    to: bloggerPath,
                };
            }
        }

        return enhanced;
    }, [
        categoryData,
        pathnames,
        id,
        recipeData,
        profileData,
        draftId,
        location.pathname,
        bloggerData,
        bloggerId,
    ]);

    return breadcrumbItems;
};
