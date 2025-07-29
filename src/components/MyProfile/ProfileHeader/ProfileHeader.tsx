import { SettingsIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import bookmarkHeart from '~/assets/actionBar/BookmarkHeart.svg';
import peopleIcon from '~/assets/peopleIcon.svg';
import { ROUTES } from '~/constants/routes';
import { useGetStatisticQuery } from '~/query/services/statistics-api/statistics-api';
import { GetMeResponse } from '~/query/services/users-api/users-api.type';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

type ProfileHeaderProps = {
    profileData: GetMeResponse;
};

export const ProfileHeader = ({ profileData }: ProfileHeaderProps) => {
    const { data: statistic } = useGetStatisticQuery();

    if (!statistic) return null;

    const bookmarksData = statistic.bookmarks;

    const countBookmarks = bookmarksData.reduce((acc, item) => acc + item.count, 0);
    return (
        <Flex p={{ md: '22px 0 22px 0', base: '22px 0 0 0' }} justify='space-between'>
            <Flex
                data-test-id='user-profile-box'
                w='100%'
                justify={{ sm: 'flex-start', base: 'center' }}
            >
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    align={{ base: 'center', sm: 'flex-start' }}
                >
                    <Avatar
                        src={getFullMediaUrl(profileData.photoLink)}
                        name={`${profileData.firstName} ${profileData.lastName}`}
                        w={{ md: '128px', base: '96px' }}
                        h={{ md: '128px', base: '96px' }}
                        ml={{ sm: '0', base: '12px' }}
                        borderRadius='full'
                    />
                    <Box ml={{ md: '24px', base: '12px' }}>
                        <Text
                            data-test-id='user-profile-name'
                            fontSize={{ md: '48px', base: '24px' }}
                            fontWeight='700'
                            lineHeight='133%'
                        >
                            {`${profileData.firstName} ${profileData.lastName}`}
                        </Text>
                        <Text
                            data-test-id='user-profile-login'
                            fontSize='14px'
                            fontWeight='400'
                            lineHeight='143%'
                            color='rgba(0, 0, 0, 0.64)'
                            mt='12px'
                            textAlign={{ base: 'center', sm: 'start' }}
                        >
                            @{profileData.login}
                        </Text>
                        <Flex
                            data-test-id='user-profile-stats-block'
                            gap='12px'
                            justify={{ base: 'center', sm: 'flex-start' }}
                        >
                            <Flex gap='8px' align='center' mt='12px'>
                                <Image src={bookmarkHeart} w='12px' h='10px' />
                                <Text
                                    fontWeight='600'
                                    fontSize='12px'
                                    lineHeight='133%'
                                    color='var(--lime-600)'
                                >
                                    {countBookmarks}
                                </Text>
                            </Flex>
                            <Flex gap='8px' align='center' mt='12px'>
                                <Image src={peopleIcon} w='12px' h='10px' />
                                <Text
                                    fontWeight='600'
                                    fontSize='12px'
                                    lineHeight='133%'
                                    color='var(--lime-600)'
                                >
                                    {profileData.subscribers.length}
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
            <Flex h='24px'>
                <Link to={`${ROUTES.PROFILE}${ROUTES.SETTINGS}`} data-test-id='settings-button'>
                    <SettingsIcon w='24px' h='24px' />
                </Link>
            </Flex>
        </Flex>
    );
};
