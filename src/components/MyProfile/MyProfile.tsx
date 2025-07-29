import { Flex } from '@chakra-ui/react';
import { skipToken } from '@reduxjs/toolkit/query';

import { useGetRecipeByUserIdQuery } from '~/query/services/recipe-api/recipe-api';
import { useGetMeQuery } from '~/query/services/users-api/users-api';

import { ProfileBookmarks } from './ProfileBookmarks/ProfileBookmarks';
import { ProfileHeader } from './ProfileHeader/ProfileHeader';
import { ProfileNotes } from './ProfileNotes/ProfileNotes';
import { ProfileRecipes } from './ProfileRecipes/ProfileRecipes';

export const MyProfile = () => {
    const { data: profileData } = useGetMeQuery();
    const { data: recipesData, refetch } = useGetRecipeByUserIdQuery(
        profileData ? profileData._id : skipToken,
    );

    if (!profileData || !recipesData) return null;

    return (
        <Flex w='100%' direction='column' gap={{ md: '24px', base: '16px' }}>
            <ProfileHeader profileData={profileData} />
            <ProfileRecipes profileData={profileData} recipesData={recipesData} />
            <ProfileNotes notes={recipesData.notes} refetch={refetch} />
            <ProfileBookmarks recipesData={recipesData} />
        </Flex>
    );
};
