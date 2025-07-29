import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';

import PersonPlusFill from '~/assets/actionBar/PersonPlusFill.svg';
import subscribeIcon from '~/assets/actionBar/subscribeIcon.svg';
import peopleIcon from '~/assets/peopleIcon.svg';
import {
    useGetBloggerByIdQuery,
    useSubscriptionMutation,
} from '~/query/services/bloggers-api/bloggers-api';
import { getUserIdFromToken } from '~/utils/getUserIdFromToken';

export const Author = ({ bloggerId }: { bloggerId: string }) => {
    const currentUserId = getUserIdFromToken();
    const { data, refetch } = useGetBloggerByIdQuery({ currentUserId, bloggerId });
    const [subscribe] = useSubscriptionMutation();

    const handleClickSubscribe = (toUserId: string) => {
        if (!toUserId) return;
        subscribe({ fromUserId: currentUserId, toUserId });
        refetch();
    };

    if (!data?.bloggerInfo) return null;

    return (
        <Flex mt='40px' direction='column' align='center'>
            <Flex
                justify='space-between'
                align='flex-start'
                w={{ lg: '668px', md: '578px', sm: '604px', base: '328px' }}
                h={{ sm: '144px', base: '120px' }}
                bg='#c4ff61'
                position={{ base: 'relative', sm: 'static' }}
                borderRadius='8px'
            >
                <Flex>
                    <Avatar
                        name={data.bloggerInfo.firstName + ' ' + data?.bloggerInfo.lastName}
                        w='96px'
                        h='96px'
                        mt={{ base: '12px', sm: '24px' }}
                        ml={{ base: '12px', sm: '24px' }}
                    />
                    <Flex
                        direction='column'
                        justify='space-between'
                        m={{ sm: '24px 0 0 16px', base: '20px 0 0 8px' }}
                    >
                        <Flex direction='column'>
                            <Text
                                fontWeight='700'
                                fontSize={{ md: '24px', base: '16px' }}
                                lineHeight='133%'
                            >
                                {data.bloggerInfo.firstName} {data.bloggerInfo.lastName}
                            </Text>
                            <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                                @{data.bloggerInfo.login}
                            </Text>
                        </Flex>
                        <Button
                            border={
                                data.isFavorite
                                    ? '1px solid rgba(0, 0, 0, 0.48)'
                                    : '1px solid rgba(0, 0, 0, 0.08)'
                            }
                            borderRadius='6px'
                            w='122px'
                            h='24px'
                            bg={data.isFavorite ? 'transparent' : 'rgba(0, 0, 0, 0.92)'}
                            leftIcon={
                                <Image
                                    src={data.isFavorite ? subscribeIcon : PersonPlusFill}
                                    w='12px'
                                    h='12px'
                                />
                            }
                            fontWeight='600'
                            fontSize='12px'
                            lineHeight='133%'
                            color={data.isFavorite ? 'rgba(0, 0, 0, 0.8)' : '#fff'}
                            onClick={() => handleClickSubscribe(data.bloggerInfo._id)}
                        >
                            {data.isFavorite ? 'Вы подписаны' : 'Подписаться'}
                        </Button>
                    </Flex>
                </Flex>
                <Flex direction='column' justify='space-between' h='96px' m='24px 24px 0 0 '>
                    <Box position={{ base: 'absolute', sm: 'static' }} top='8px' right='8px'>
                        <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                            Автор рецепта
                        </Text>
                    </Box>
                    <Flex
                        justify='flex-end'
                        gap='6px'
                        position={{ base: 'absolute', sm: 'static' }}
                        bottom='16px'
                        right='16px'
                    >
                        <Image src={peopleIcon} w='12px' h='12px' />
                        <Text fontWeight='600' fontSize='12px' lineHeight='133%' color=' #2db100'>
                            {data.totalSubscribers}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
