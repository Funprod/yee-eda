import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { useGetRecipeByIdQuery } from '~/query/services/recipe-api/recipe-api';
import { useGetMeQuery } from '~/query/services/users-api/users-api';
import { recipeIdSelector } from '~/store/app-slice';

import { NewRecipe } from '../NewRecipe/NewRecipe';

export const EditRecipe = () => {
    const { id, draftId } = useParams();
    const recipeId = useSelector(recipeIdSelector);
    const { data: recipeData } = useGetRecipeByIdQuery(id === recipeId ? skipToken : { id: id! });
    const { data: profileData } = useGetMeQuery();
    if (!profileData) return null;
    const draftRecipe = profileData.drafts.find((recipe) => recipe._id === draftId);
    const data = recipeData ? recipeData : draftRecipe;
    if (!data) return null;

    return <NewRecipe dataForEditing={data} editMode id={data._id} draftId={draftId} />;
};
