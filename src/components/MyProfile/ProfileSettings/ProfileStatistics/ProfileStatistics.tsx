import { Avatar, Box, Button, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';
import { useState } from 'react';

import PeopleFill from '~/assets/actionBar/PeopleFill.svg';
import { useCanRecommendRecipes } from '~/hooks/useCanRecommendRecipes';
import { useGetStatisticQuery } from '~/query/services/statistics-api/statistics-api';
import { useGetAllUsersQuery } from '~/query/services/users-api/users-api';
import { GetMeResponse } from '~/query/services/users-api/users-api.type';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

import { RecommendUnlockBanner } from '../RecommendUnlockBanner/RecommendUnlockBanner';
import { ProfileChart } from './ProfileChart/ProfileChart';

type ProfileStatisticsProps = {
    profileData: GetMeResponse;
};

export const ProfileStatistics = ({ profileData }: ProfileStatisticsProps) => {
    const { data: allUsersData } = useGetAllUsersQuery();
    const { data: statistic } = useGetStatisticQuery();
    const [showAll, setShowAll] = useState(false);
    const { canRecommend } = useCanRecommendRecipes();

    const [isLg] = useMediaQuery(`(min-width: 1441px)`);

    const DEFAULT_VISIBLE_SUBSCRIBERS = isLg ? 12 : 8;
    if (!allUsersData || !statistic) return null;
    const subscribers = allUsersData.filter((user) => profileData.subscribers.includes(user.id));
    const likesData = statistic.likes;
    const bookmarksData = statistic.bookmarks;

    return (
        <Flex direction='column' w='100%' gap='16px'>
            <Text fontWeight='700' fontSize={{ md: '20px', base: '18px' }} lineHeight='140%'>
                Статистика
            </Text>
            <Flex direction='column' gap='16px'>
                <Flex align='center' gap='6px'>
                    <Image src={PeopleFill} w='12px' h='12px' />
                    <Text fontWeight='600' fontSize='12px' lineHeight='133%' color='#2db100'>
                        {profileData.subscribers.length} подписчиков
                    </Text>
                </Flex>
                {subscribers.length > 0 && (
                    <Flex wrap='wrap' w='100%' gap={{ lg: '12px', md: '16px', base: '10px' }}>
                        {profileData.subscribers.length > 0 &&
                            subscribers.map((user, index) => (
                                <Flex
                                    key={user.id}
                                    border='1px solid rgba(0, 0, 0, 0.08)'
                                    borderRadius='8px'
                                    w={{ lg: '445px', md: '432px', base: '359px' }}
                                    h={{ md: '80px', base: '64px' }}
                                    p={{ md: '16px 24px', base: '8px 12px' }}
                                    gap='12px'
                                    display={
                                        !showAll && index >= DEFAULT_VISIBLE_SUBSCRIBERS
                                            ? 'none'
                                            : 'flex'
                                    }
                                >
                                    <Avatar
                                        name={`${user.firstName} ${user.lastName}`}
                                        src={getFullMediaUrl(user.photo)}
                                        w='48px'
                                        h='48px'
                                    />
                                    <Box>
                                        <Text fontWeight='500' fontSize='18px' lineHeight='156%'>
                                            {user.firstName} {user.lastName}
                                        </Text>
                                        <Text
                                            fontWeight='400'
                                            fontSize='14px'
                                            lineHeight='143%'
                                            color='rgba(0, 0, 0, 0.64)'
                                        >
                                            @{user.login}
                                        </Text>
                                    </Box>
                                </Flex>
                            ))}
                    </Flex>
                )}
                {subscribers.length > DEFAULT_VISIBLE_SUBSCRIBERS && (
                    <Flex justify='center'>
                        {!showAll ? (
                            <Button
                                data-test-id='blogger-user-notes-button'
                                w='147px'
                                h='32px'
                                borderRadius='6px'
                                bg='transparent'
                                fontWeight='600'
                                fontSize='14px'
                                lineHeight='143%'
                                onClick={() => setShowAll(true)}
                            >
                                Показать больше
                            </Button>
                        ) : (
                            <Button
                                data-test-id='blogger-user-notes-button'
                                w='147px'
                                h='32px'
                                borderRadius='6px'
                                bg='transparent'
                                fontWeight='600'
                                fontSize='14px'
                                lineHeight='143%'
                                onClick={() => setShowAll(false)}
                            >
                                Свернуть
                            </Button>
                        )}
                    </Flex>
                )}
            </Flex>
            <ProfileChart chartData={bookmarksData} isBookmarks />
            <ProfileChart chartData={likesData} />
            {canRecommend && (
                <RecommendUnlockBanner
                    allUsersData={allUsersData}
                    totalSubscribers={profileData.subscribers.length}
                    statistic={statistic}
                />
            )}
        </Flex>
    );
};
