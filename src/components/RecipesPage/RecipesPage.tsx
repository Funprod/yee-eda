import { Flex } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { useCanRecommendRecipes } from '~/hooks/useCanRecommendRecipes';
import { useGetRecipeByIdQuery } from '~/query/services/recipe-api/recipe-api';
import { recipeIdSelector } from '~/store/app-slice';

import { NewRecipesSection } from '../Main/NewRecipesSection/NewRecipesSection';
import { Author } from './Author/Author';
import { ButtonRecommend } from './ButtonRecommend/ButtonRecommend';
import { CalorieInfo } from './CalorieInfo/CalorieInfo';
import { CookingSteps } from './RecipeHeader/CookingSteps/CookingSteps';
import { IngredientsTable } from './RecipeHeader/IngredientsTable/IngredientsTable';
import { RecipeHeader } from './RecipeHeader/RecipeHeader';

export const RecipePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const recipeId = useSelector(recipeIdSelector);
    const { data, error, isError } = useGetRecipeByIdQuery(
        id === recipeId ? skipToken : { id: id! },
    );

    const { canRecommend } = useCanRecommendRecipes();

    useEffect(() => {
        if (isError && error) {
            sessionStorage.setItem('error', 'Попробуйте немного позже');
            const timer = setTimeout(() => {
                navigate(-1);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isError, error, dispatch, navigate]);

    return (
        <>
            {data && (
                <Flex direction='column' width='100%' pt={{ md: '32px', base: '16px' }}>
                    <RecipeHeader data={data} />
                    <CalorieInfo data={data} />
                    <IngredientsTable data={data} />
                    <CookingSteps data={data} />
                    <Author bloggerId={data.authorId} />
                    {canRecommend && (
                        <ButtonRecommend
                            id={data._id}
                            recommendedByUserId={data.recommendedByUserId}
                        />
                    )}
                    <NewRecipesSection />
                </Flex>
            )}
        </>
    );
};
