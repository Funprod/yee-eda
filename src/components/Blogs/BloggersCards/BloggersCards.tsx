import { Avatar, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import BookmarkHeart from '~/assets/actionBar/BookmarkHeart.svg';
import PeopleFillWhite from '~/assets/actionBar/PeopleFillWhite.svg';
import PersonPlusFill from '~/assets/actionBar/PersonPlusFill.svg';
import subscribeIcon from '~/assets/actionBar/subscribeIcon.svg';
import { Loader } from '~/components/Loader/Loader';
import { ROUTES } from '~/constants/routes';
import { useSubscriptionMutation } from '~/query/services/bloggers-api/bloggers-api';
import { Blogger } from '~/query/services/bloggers-api/bloggers-api.type';

type BloggersCardsProps = {
    blogger: Blogger;
    fromUserId: string;
    isOtherBlock?: boolean;
};

export const BloggersCards = ({ blogger, fromUserId, isOtherBlock }: BloggersCardsProps) => {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [subscribedIds, setSubscribedIds] = useState<string[]>([]);
    const [subscribe] = useSubscriptionMutation();

    const navigate = useNavigate();

    const handleClickSubscribe = async (toUserId: string) => {
        if (!toUserId) return;
        setLoadingId(toUserId);
        const isSubscribed = subscribedIds.includes(toUserId);
        const res = await subscribe({ fromUserId, toUserId });
        if (res) {
            setSubscribedIds((prev) =>
                isSubscribed ? prev.filter((id) => id !== toUserId) : [...prev, toUserId],
            );
            setLoadingId(null);
        }
    };

    const handleGoToBlogger = (bloggerId: string, goToNotes?: boolean) => {
        const path = `${ROUTES.BLOGS}/${bloggerId}${goToNotes ? '#notes' : ''}`;
        navigate(path);
    };

    const note =
        blogger.notes && blogger.notes.length > 0 && blogger.notes[0].text
            ? blogger.notes[0].text
            : '';

    const isSubscribed = blogger.isFavorite;

    return (
        <Flex data-test-id='blogger-user-other-blogs-grid' mb='24px'>
            <Flex
                direction='column'
                justify='space-between'
                gap='28px'
                position='relative'
                borderRadius='8px'
                border='1px solid rgba(0, 0, 0, 0.08)'
                p={{ md: '24px', base: '24px 16px 16px 16px' }}
                w={
                    isOtherBlock
                        ? { lg: '442px', md: '282px', sm: '234px', base: '304px' }
                        : { lg: '426px', md: '408px', sm: '346px', base: '304px' }
                }
                minH='224px'
                bg='#fff'
            >
                {loadingId === blogger._id && <Loader />}
                <Flex>
                    <Avatar name={blogger.firstName + ' ' + blogger.lastName} />
                    <Flex direction='column' ml='12px'>
                        <Text
                            fontWeight='500'
                            fontSize={{ md: '18px', base: '16px' }}
                            lineHeight='156%'
                        >
                            {blogger.firstName} {blogger.lastName}
                        </Text>
                        <Text
                            fontWeight='400'
                            fontSize={{ md: '14px', base: '12px' }}
                            lineHeight='143%'
                            color='rgba(0, 0, 0, 0.64)'
                        >
                            @{blogger.login}
                        </Text>
                    </Flex>
                </Flex>
                <Flex direction='column' gap='16px'>
                    <Text fontWeight='400' fontSize='14px' lineHeight='143%' noOfLines={3} h='64px'>
                        {note}
                    </Text>
                    <Flex
                        justify='space-between'
                        align={isOtherBlock ? { base: 'flex-end', lg: 'center' } : 'center'}
                        direction={isOtherBlock ? { base: 'column-reverse', lg: 'row' } : 'row'}
                        gap={isOtherBlock ? '20px' : '0'}
                    >
                        <Flex gap='8px'>
                            <Button
                                data-test-id={
                                    isSubscribed
                                        ? 'blog-toggle-unsubscribe'
                                        : 'blog-toggle-subscribe'
                                }
                                border={
                                    isSubscribed
                                        ? '1px solid rgba(0, 0, 0, 0.48)'
                                        : '1px solid rgba(0, 0, 0, 0.08)'
                                }
                                borderRadius='6px'
                                w='122px'
                                h='24px'
                                bg={isSubscribed ? 'transparent' : 'rgba(0, 0, 0, 0.92)'}
                                leftIcon={
                                    <Image
                                        src={isSubscribed ? subscribeIcon : PersonPlusFill}
                                        w='12px'
                                        h='12px'
                                    />
                                }
                                fontWeight='600'
                                fontSize='12px'
                                lineHeight='133%'
                                color={isSubscribed ? 'rgba(0, 0, 0, 0.8)' : '#fff'}
                                onClick={() => handleClickSubscribe(blogger._id)}
                            >
                                {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
                            </Button>
                            <Button
                                border='1px solid #2db100'
                                borderRadius='6px'
                                w='60px'
                                h='24px'
                                bg='transparent'
                                fontWeight='600'
                                fontSize='12px'
                                lineHeight='133%'
                                color='#2db100'
                                onClick={() => handleGoToBlogger(blogger._id, true)}
                            >
                                Читать
                            </Button>
                        </Flex>
                        <Flex gap={{ sm: '12px', base: '8px' }}>
                            <Flex align='center' gap='6px'>
                                <Image src={BookmarkHeart} w='10px' h='12px' />
                                <Text
                                    fontWeight='600'
                                    fontSize='12px'
                                    lineHeight='133%'
                                    color=' #2db100'
                                >
                                    {blogger.bookmarksCount}
                                </Text>
                            </Flex>
                            <Flex align='center' gap='6px'>
                                <Image src={PeopleFillWhite} w='13px' h='12px' />
                                <Text
                                    fontWeight='600'
                                    fontSize='12px'
                                    lineHeight='133%'
                                    color=' #2db100'
                                >
                                    {blogger.subscribersCount}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
