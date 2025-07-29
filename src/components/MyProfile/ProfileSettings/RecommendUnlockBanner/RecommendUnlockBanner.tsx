import { Button, Flex, Image, Text } from '@chakra-ui/react';

import bookmarkHeart from '~/assets/actionBar/BookmarkHeart.svg';
import BannerImg from '~/assets/BannerImg.png';
import fingerUp from '~/assets/fingerUp.svg';
import fingerUpBlack from '~/assets/fingerUpBlack.svg';
import peopleIcon from '~/assets/peopleIcon.svg';
import { RecommendRecipeCard } from '~/components/MyProfile/ProfileSettings/RecommendUnlockBanner/RecommendRecipeCard/RecommendRecipeCard';
import { getStatisticsResponse } from '~/query/services/statistics-api/statistics-api.type';
import { GetAllUsersResponse } from '~/query/services/users-api/users-api.type';

type RecommendUnlockBannerProps = {
    allUsersData: GetAllUsersResponse[];
    statistic: getStatisticsResponse;
    totalSubscribers: number;
};

export const RecommendUnlockBanner = ({
    allUsersData,
    statistic,
    totalSubscribers,
}: RecommendUnlockBannerProps) => {
    const totalBookmarks = statistic.bookmarks.reduce((acc, item) => acc + item.count, 0);
    return (
        <Flex
            data-test-id='settings-recommendation-info-block'
            direction='column'
            gap='44px'
            mt={{ md: '16px', base: '0' }}
        >
            <Flex
                w={{ lg: '1129px', md: '880px', sm: '730px', base: '328px' }}
                h={{ md: '254px', sm: '168px', base: '352px' }}
                p={{ lg: '24px 32px', md: '24px', sm: '16px', base: '24px 16px 16px 16px' }}
                borderRadius='16px'
                bg='#d7ff94'
                justify='space-between'
                direction={{ sm: 'row', base: 'column' }}
                position='relative'
            >
                <Flex
                    gap={{ sm: '32px', base: '24px' }}
                    direction={{ sm: 'row', base: 'column' }}
                    align='center'
                >
                    <Image
                        src={BannerImg}
                        w={{ md: '206px', base: '108px' }}
                        h={{ md: '206px', base: '108px' }}
                    />
                    <Flex
                        direction='column'
                        gap={{ lg: '28px', sm: '24px', base: '16px' }}
                        w={{ lg: '580px', md: '462px', sm: '384px' }}
                        justify='space-between'
                    >
                        <Text
                            fontWeight='600'
                            fontSize={{ md: '36px', base: '20px' }}
                            lineHeight='28px'
                            mt={{ lg: '14px', md: '0' }}
                        >
                            Теперь вы можете рекомендовать рецепты других авторов
                        </Text>
                        <Flex
                            gap='8px'
                            align={{ lg: 'center', base: 'flex-start' }}
                            direction={{ lg: 'row', base: 'column' }}
                        >
                            <Text fontWeight='500' fontSize='16px' lineHeight='150%'>
                                Это можно будет сделать с помощью кнопки
                            </Text>
                            <Button
                                border='1px solid rgba(0, 0, 0, 0.08)'
                                borderRadius='6px'
                                w={{ md: '210px', base: '174px' }}
                                h={{ md: '32px', base: '24px' }}
                                bg='rgba(0, 0, 0, 0.92)'
                                leftIcon={<Image src={fingerUp} w='14px' h='14px' />}
                                fontWeight='600'
                                fontSize={{ md: '14px', base: '12px' }}
                                lineHeight='133%'
                                color='#fff'
                            >
                                Рекомендовать рецепт
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex gap='12px' align='flex-start' position='absolute' right='16px' top='16px'>
                    <Flex gap='6px' align='center' mt='8px'>
                        <Image src={bookmarkHeart} w='12px' h='12px' />
                        <Text
                            fontWeight='600'
                            fontSize='12px'
                            lineHeight='133%'
                            color='var(--lime-600)'
                        >
                            {totalBookmarks}
                        </Text>
                    </Flex>
                    <Flex gap='6px' align='center' mt='8px'>
                        <Image src={peopleIcon} w='12px' h='13px' />
                        <Text
                            fontWeight='600'
                            fontSize='12px'
                            lineHeight='133%'
                            color='var(--lime-600)'
                        >
                            {totalSubscribers}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex gap='6px'>
                <Image src={fingerUpBlack} w='12px' h='13px' />
                <Text fontWeight='600' fontSize='12px' lineHeight='133%' color='#2db100'>
                    {`${statistic.recommendationsCount ? statistic.recommendationsCount : 0} рекомендованных рецептов`}
                </Text>
            </Flex>
            <Flex wrap='wrap' gap={{ md: '24px', base: '16px' }}>
                {statistic.recipesWithRecommendations?.map((card) => (
                    <RecommendRecipeCard key={card._id} allUsersData={allUsersData} card={card} />
                ))}
            </Flex>
        </Flex>
    );
};
