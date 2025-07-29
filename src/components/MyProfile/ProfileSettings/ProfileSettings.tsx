import { Flex } from '@chakra-ui/react';

import { useGetMeQuery } from '~/query/services/users-api/users-api';

import { MainSettings } from './MainSettings/MainSettings';
import { ProfileStatistics } from './ProfileStatistics/ProfileStatistics';
import { SettingsFooter } from './SettingsFooter/SettingsFooter';

export const ProfileSettings = () => {
    const { data: profileData } = useGetMeQuery();
    if (!profileData) return null;
    return (
        <Flex w='100%' direction='column' mt='24px' gap='40px'>
            <MainSettings profileData={profileData} />
            <ProfileStatistics profileData={profileData} />
            <SettingsFooter />
        </Flex>
    );
};
