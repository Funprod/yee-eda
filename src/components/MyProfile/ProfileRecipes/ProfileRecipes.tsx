import { Button, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { GetRecipeByUserId } from '~/query/services/recipe-api/recipe-api.type';
import { GetMeResponse } from '~/query/services/users-api/users-api.type';
import { checkAndNavigate } from '~/utils/checkAndNavigate';
import { useCategoryData } from '~/utils/getCategories';

import { ProfileRecipeCard } from './ProfileRecipeCard/ProfileRecipeCard';

export type AllRecipes = {
    _id: string;
    image: string;
    title: string;
    description: string;
    categoriesIds: string[];
    draft?: boolean;
    recommendedByUserId?: string[];
    likes?: number;
    bookmarks?: number;
};

type ProfileRecipesProps = {
    profileData: GetMeResponse;
    recipesData: GetRecipeByUserId;
};

const MAX_VISIBLE_RECIPES = 8;

export const ProfileRecipes = ({ profileData, recipesData }: ProfileRecipesProps) => {
    const navigate = useNavigate();
    const [showAll, setShowAll] = useState(false);
    const categoryData = useCategoryData();

    const draftsRecipes = profileData.drafts.map((recipe) => ({
        ...recipe,
        draft: true,
    }));

    const allRecipes = [...draftsRecipes, ...recipesData.recipes];
    const recipes = allRecipes.slice(0, showAll ? allRecipes.length : MAX_VISIBLE_RECIPES);

    const handleClickEditRecipe = (recipeId: string, categoriesIds: string[]) => {
        const { condition, matchedCategory, matchedSubcategory } = checkAndNavigate({
            categoriesIds,
            categoryData: categoryData,
        });
        if (condition) {
            navigate(ROUTES.NOT_FOUND);
            return;
        }
        navigate(
            `${ROUTES.EDIT_RECIPE}/${matchedCategory?.category}/${matchedSubcategory?.category}/${recipeId}`,
        );
    };
    const handleClickEditDraftRecipe = (recipeId: string) => {
        navigate(`${ROUTES.EDIT_DRAFT}/${recipeId}`);
    };

    return (
        <Flex data-test-id='user-profile-recipes' w='100%' direction='column' gap='16px'>
            <Flex gap={{ md: '32px', base: '16px' }}>
                <Flex gap={{ md: '8px', base: '4px' }}>
                    <Text
                        fontWeight='700'
                        fontSize={{ md: '20px', base: '18px' }}
                        lineHeight='140%'
                    >
                        Мои рецепты
                    </Text>
                    <Text
                        fontWeight='400'
                        fontSize={{ md: '20px', base: '18px' }}
                        lineHeight='140%'
                        color='rgba(0, 0, 0, 0.48)'
                    >
                        ({recipesData.recipes.length})
                    </Text>
                </Flex>
                {profileData.drafts.length > 0 && (
                    <Flex gap={{ md: '8px', base: '4px' }}>
                        <Text
                            fontWeight='700'
                            fontSize={{ md: '20px', base: '18px' }}
                            lineHeight='140%'
                        >
                            Черновики
                        </Text>
                        <Text
                            fontWeight='400'
                            fontSize={{ md: '20px', base: '18px' }}
                            lineHeight='140%'
                            color='rgba(0, 0, 0, 0.48)'
                        >
                            ({profileData.drafts.length})
                        </Text>
                    </Flex>
                )}
            </Flex>
            {recipes.length > 0 && (
                <Flex wrap='wrap' gap='16px'>
                    {recipes.map((recipe: AllRecipes, index) => (
                        <ProfileRecipeCard
                            key={recipe._id}
                            index={index}
                            recipe={recipe}
                            handleClickEditRecipe={handleClickEditRecipe}
                            handleClickEditDraftRecipe={handleClickEditDraftRecipe}
                        />
                    ))}
                </Flex>
            )}
            {!showAll && allRecipes.length > MAX_VISIBLE_RECIPES && (
                <Flex w='100%' justify='center' mt='24px'>
                    <Button
                        data-test-id='load-more-button'
                        borderRadius='6px'
                        padding='0 24px'
                        maxW={{ lg: '197px', base: '167px' }}
                        w='100%'
                        h={{ lg: '48px', base: '40px' }}
                        maxH='100%'
                        background='#b1ff2e'
                        _hover={{
                            background: 'rgba(177, 255, 46, 0.6)',
                            border: '1px solid #b1ff2e',
                        }}
                        onClick={() => setShowAll(true)}
                    >
                        <Text
                            fontWeight='600'
                            fontSize={{ lg: '18px', base: '16px' }}
                            lineHeight='150%'
                        >
                            загрузить ещё
                        </Text>
                    </Button>
                </Flex>
            )}
        </Flex>
    );
};
