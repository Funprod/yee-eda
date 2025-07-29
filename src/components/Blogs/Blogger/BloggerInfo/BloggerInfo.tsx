import { Avatar, Button, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import BookmarkHeart from '~/assets/actionBar/BookmarkHeart.svg';
import PeopleFillWhite from '~/assets/actionBar/PeopleFillWhite.svg';
import PersonPlusFill from '~/assets/actionBar/PersonPlusFill.svg';
import subscribeIcon from '~/assets/actionBar/subscribeIcon.svg';
import { Loader } from '~/components/Loader/Loader';
import { ROUTES } from '~/constants/routes';
import {
    useGetBloggerByIdQuery,
    useSubscriptionMutation,
} from '~/query/services/bloggers-api/bloggers-api';
import { getUserIdFromToken } from '~/utils/getUserIdFromToken';
type BloggerInfoProps = {
    bloggerId: string;
};

export const BloggerInfo = ({ bloggerId }: BloggerInfoProps) => {
    const currentUserId = getUserIdFromToken();
    const navigate = useNavigate();
    const { data, error } = useGetBloggerByIdQuery({ currentUserId, bloggerId });
    const [subscribe] = useSubscriptionMutation();
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [subscribedIds, setSubscribedIds] = useState<string[]>([]);

    const handleClickSubscribe = async (toUserId: string) => {
        if (!toUserId) return;
        setLoadingId(toUserId);
        const isSubscribed = subscribedIds.includes(toUserId);
        const res = await subscribe({ fromUserId: currentUserId, toUserId });
        if (res) {
            if (isSubscribed) {
                setSubscribedIds((prev) => prev.filter((id) => id !== toUserId));
            } else {
                setSubscribedIds((prev) => [...prev, toUserId]);
            }
        }
        setLoadingId(null);
    };

    useEffect(() => {
        if (data?.bloggerInfo?._id && data?.isFavorite) {
            setSubscribedIds((prev) => [...prev, data.bloggerInfo._id]);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            navigate(ROUTES.HOME);
        }
    }, [error, navigate]);

    if (!data) return null;

    const isSubscribed = subscribedIds.includes(bloggerId);

    return (
        <Flex
            data-test-id='blogger-user-info-box'
            position='sticky'
            top={{ md: '80px', base: '64px' }}
            zIndex='1'
            minW='100%'
            justify='center'
            direction={{ sm: 'row', base: 'column' }}
            align={{ sm: 'flex-start', base: 'center' }}
            bg='#fff'
            pt='24px'
            pb='42px'
        >
            {loadingId === data.bloggerInfo._id && <Loader />}
            <Avatar
                name={data.bloggerInfo.firstName + ' ' + data.bloggerInfo.lastName}
                w='128px'
                h='128px'
            />
            <Flex
                direction='column'
                ml={{ sm: '24px', base: '0' }}
                mt={{ sm: '0', base: '24px' }}
                gap='12px'
                w={{ sm: 'auto', base: '100%' }}
                minH='120px'
                justify='space-between'
            >
                <Flex direction='column'>
                    <Text
                        data-test-id='blogger-user-info-name'
                        fontWeight='700'
                        fontSize={{ md: '48px', base: '16px' }}
                        lineHeight='100%'
                        textAlign={{ sm: 'left', base: 'center' }}
                    >
                        {data.bloggerInfo.firstName} {data.bloggerInfo.lastName}
                    </Text>
                    <Text
                        data-test-id='blogger-user-info-login'
                        fontWeight='400'
                        fontSize={{ md: '14px', base: '12px' }}
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.64)'
                        textAlign={{ sm: 'left', base: 'center' }}
                    >
                        @{data.bloggerInfo.login}
                    </Text>
                </Flex>
                <Flex justify='space-between' align='center' minW='200px'>
                    <Tooltip
                        data-test-id='blog-tooltip'
                        hasArrow
                        label={
                            <Text color='#fff' fontSize='14px' fontWeight='400' lineHeight='143%'>
                                {isSubscribed
                                    ? 'Нажмите, если хотите отписаться'
                                    : 'Нажмите, если хотите подписаться'}
                            </Text>
                        }
                        borderRadius='6px'
                        w={isSubscribed ? '144px' : '154px'}
                        h='40px'
                        bg='rgba(0, 0, 0, 0.92)'
                        p='0px 8px'
                    >
                        <Button
                            data-test-id={
                                isSubscribed ? 'blog-toggle-unsubscribe' : 'blog-toggle-subscribe'
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
                            onClick={() => handleClickSubscribe(data.bloggerInfo._id)}
                        >
                            {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
                        </Button>
                    </Tooltip>
                    <Flex gap='12px'>
                        <Flex align='center' gap='6px'>
                            <Image src={BookmarkHeart} w='10px' h='12px' />
                            <Text
                                data-test-id='blogger-followers-bookmarks'
                                fontWeight='600'
                                fontSize='12px'
                                lineHeight='133%'
                                color=' #2db100'
                            >
                                {data.totalBookmarks}
                            </Text>
                        </Flex>
                        <Flex align='center' gap='6px'>
                            <Image src={PeopleFillWhite} w='13px' h='12px' />
                            <Text
                                data-test-id='blogger-followers-count'
                                fontWeight='600'
                                fontSize='12px'
                                lineHeight='133%'
                                color=' #2db100'
                            >
                                {data.totalSubscribers}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
