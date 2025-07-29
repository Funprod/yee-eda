import { Avatar, Box, Button, Flex, Image, Link, Text, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { useGetBloggersQuery } from '~/query/services/bloggers-api/bloggers-api';
import { getUserIdFromToken } from '~/utils/getUserIdFromToken';

import arrowRight from './../../../assets/main/icon/arrowRight.svg';

export const CookingBlogsSection = () => {
    const userId = getUserIdFromToken();
    const limit = '';
    const { data } = useGetBloggersQuery({ currentUserId: userId, limit });
    const navigate = useNavigate();

    const otherBloggers = data?.others ?? [];

    const [isDesktop] = useMediaQuery('(min-width: 1025px)');
    const handleClick = () => {
        navigate(ROUTES.BLOGS);
    };
    return (
        <Flex
            data-test-id='main-page-blogs-box'
            direction='column'
            borderRadius='16px'
            padding={{ md: '24px', base: '12px' }}
            minWidth={{ lg: '1340px', md: '860px', sm: '728px', base: '328px' }}
            w='100%'
            maxHeight={{ lg: '304px', md: '264px', sm: '274px', base: '600px' }}
            h='100%'
            bg='var(--lime-300)'
            mt={{ md: '40px', base: '32px' }}
            gap={{ lg: '24px', md: '16px', base: '12px' }}
        >
            <Flex justify='space-between' align='center'>
                <Text
                    fontFamily='var(--font-family)'
                    fontWeight='400'
                    fontSize={{ lg: '36px', md: '30px', base: '24px' }}
                    lineHeight='111%'
                >
                    Кулинарные блоги
                </Text>
                {isDesktop && (
                    <Button
                        data-test-id='main-page-blogs-button'
                        borderRadius='6px'
                        padding={{ md: '0 24px', base: '0 16px' }}
                        w={{ lg: '197px', base: '149px' }}
                        h={{ lg: '48px', base: '40px' }}
                        bg='transparent'
                        _hover={{ bg: 'transparent' }}
                        onClick={handleClick}
                    >
                        <Text
                            fontWeight='600'
                            fontSize={{ lg: '18px', base: '16px' }}
                            lineHeight='150%'
                        >
                            Все авторы
                        </Text>
                        <Image src={arrowRight} alt='arrowRight' ml='8px' w='16px' h='16px' />
                    </Button>
                )}
            </Flex>
            <Flex
                data-test-id='main-page-blogs-grid'
                gap={{ md: '16px', base: '12px' }}
                wrap={{ sm: 'nowrap', base: 'wrap' }}
                minH={{ lg: '184px', md: '160px', base: '152px' }}
            >
                {otherBloggers?.map((item) => {
                    const note =
                        item.notes && item.notes.length > 0 && item.notes[0].text
                            ? item.notes[0].text
                            : '';
                    return (
                        <Link
                            data-test-id='blogs-card'
                            href={ROUTES.HOME}
                            _hover={{
                                boxShadow: 'md',
                            }}
                            cursor='pointer'
                            key={item._id}
                        >
                            <Flex
                                direction='column'
                                minW={{ lg: '416px', md: '256px', sm: '216px', base: '304px' }}
                                h={{ lg: '184px', md: '160px', base: '152px' }}
                                bg='#fff'
                                borderRadius='8px'
                                border='1px solid rgba(0, 0, 0, 0.08)'
                            >
                                <Flex
                                    p={{ lg: '24px 24px 16px 24px', base: '16px 16px 8px 8px' }}
                                    gap={{ md: '12px', base: '8px' }}
                                >
                                    <Avatar name={item.firstName + ' ' + item.lastName} src='' />
                                    <Flex direction='column'>
                                        <Text
                                            data-test-id='blogs-card-name'
                                            fontWeight='500'
                                            fontSize={{ md: '18px', base: '16px' }}
                                            lineHeight='150%'
                                            noOfLines={1}
                                        >
                                            {item.firstName} {item.lastName}
                                        </Text>
                                        <Link
                                            data-test-id='blogs-card-login'
                                            fontWeight='400'
                                            fontSize={{ md: '14px', base: '12px' }}
                                            lineHeight='143%'
                                            color='rgba(0, 0, 0, 0.64)'
                                        >
                                            @{item.login}
                                        </Link>
                                    </Flex>
                                </Flex>
                                <Box p={{ lg: '12px 24px 20px 24px', base: '8px 16px 16px 16px' }}>
                                    <Text
                                        data-test-id='blogs-card-notes-text'
                                        fontWeight='400'
                                        fontSize='14px'
                                        lineHeight='143%'
                                        noOfLines={3}
                                    >
                                        {note}
                                    </Text>
                                </Box>
                            </Flex>
                        </Link>
                    );
                })}
            </Flex>
            <Flex justify='center'>
                {!isDesktop && (
                    <Button
                        data-test-id='main-page-blogs-button'
                        borderRadius='6px'
                        padding={{ md: '0 24px', base: '0 16px' }}
                        w={{ lg: '197px', base: '149px' }}
                        h={{ lg: '48px', base: '40px' }}
                        bg='transparent'
                        _hover={{ bg: 'transparent' }}
                        onClick={handleClick}
                    >
                        <Text
                            fontWeight='600'
                            fontSize={{ lg: '18px', base: '16px' }}
                            lineHeight='150%'
                        >
                            Все авторы
                        </Text>
                        <Image src={arrowRight} alt='arrowRight' ml='8px' w='16px' h='16px' />
                    </Button>
                )}
            </Flex>
        </Flex>
    );
};
