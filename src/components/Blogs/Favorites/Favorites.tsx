import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import BookmarkHeart from '~/assets/actionBar/BookmarkHeart.svg';
import PeopleFillWhite from '~/assets/actionBar/PeopleFillWhite.svg';
import { ROUTES } from '~/constants/routes';
import { Blogger } from '~/query/services/bloggers-api/bloggers-api.type';
import { getRecipeWord } from '~/utils/getRecipeWord';
type FavoritesProps = {
    bloggers: Blogger[];
};
export const Favorites = ({ bloggers }: FavoritesProps) => {
    const navigate = useNavigate();

    if (!bloggers.length) return null;

    const handleGoToBlogger = (bloggerId: string, goToNotes?: boolean) => {
        const path = `${ROUTES.BLOGS}/${bloggerId}${goToNotes ? '#notes' : ''}`;
        navigate(path);
    };
    return (
        <Flex
            data-test-id='blogs-favorites-box'
            w='100%'
            borderRadius='16px'
            bg='var(--lime-300)'
            p={{ md: '24px', base: '12px' }}
            mt='24px'
            direction='column'
        >
            <Text fontWeight='400' fontSize={{ md: '36px', base: '24px' }} lineHeight='111%'>
                Избранные блоги
            </Text>
            <Flex
                data-test-id='blogs-favorites-grid'
                wrap='wrap'
                gap={{ md: '16px', base: '12px' }}
                mt='16px'
                justify={{ sm: 'flex-start', base: 'center' }}
            >
                {bloggers.map((blogger) => (
                    <Flex
                        key={blogger._id}
                        direction='column'
                        borderRadius='8px'
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        maxW={{ lg: '648px', md: '408px', sm: '346px', base: '304px' }}
                        w='100%'
                        minH={{ md: '224px', base: '208px' }}
                        bg='#fff'
                        p={{ md: '24px', base: '24px 16px 16px 16px' }}
                        gap={{ md: '28px', base: '16px' }}
                        position='relative'
                    >
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
                            {blogger.newRecipesCount > 0 && (
                                <Box
                                    data-test-id='blogs-card-new-recipes-badge'
                                    borderRadius='4px'
                                    w='123px'
                                    h='24px'
                                    bg='rgba(0, 0, 0, 0.06)'
                                    position='absolute'
                                    right={{ sm: '8px', base: '4px' }}
                                    top={{ sm: '8px', base: '4px' }}
                                >
                                    <Text
                                        fontWeight='400'
                                        fontSize='14px'
                                        lineHeight='143%'
                                        color='#000'
                                        textAlign='center'
                                    >
                                        {blogger.newRecipesCount}{' '}
                                        {getRecipeWord(blogger.newRecipesCount)}
                                    </Text>
                                </Box>
                            )}
                        </Flex>
                        <Flex direction='column' gap='16px'>
                            <Text
                                fontWeight='400'
                                fontSize='14px'
                                lineHeight='143%'
                                noOfLines={3}
                                h='64px'
                            >
                                {blogger.notes && blogger.notes.length > 0 && blogger.notes[0].text
                                    ? blogger.notes[0].text
                                    : ''}
                            </Text>
                            <Flex justify='space-between' align='center'>
                                <Flex gap='8px'>
                                    <Button
                                        data-test-id='blogs-card-recipes-button'
                                        borderRadius='6px'
                                        w='86px'
                                        h='24px'
                                        bg=' #b1ff2e'
                                        fontWeight='600'
                                        fontSize='14px'
                                        lineHeight='143%'
                                        color='#000'
                                        onClick={() => handleGoToBlogger(blogger._id)}
                                    >
                                        Рецепты
                                    </Button>
                                    <Button
                                        data-test-id='blogs-card-notes-button'
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
                                <Flex gap='12px'>
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
                ))}
            </Flex>
        </Flex>
    );
};
