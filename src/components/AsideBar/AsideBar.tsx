import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router';
import { Link } from 'react-router';

import fingerUpBlack from '~/assets/fingerUpBlack.svg';
import { ROUTES } from '~/constants/routes';
import { useCanRecommendRecipes } from '~/hooks/useCanRecommendRecipes';

import { ActionIcon } from '../Header/ActionIcon/ActionIcon';
import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';
import iconButton from './../../assets/actionBar/IconButton.svg';
import peopleFill from './../../assets/actionBar/PeopleFill.svg';

export const AsideBar = () => {
    const pathname = useLocation().pathname;

    const { canRecommend, countLikes, countBookmarks, subscriberCount, recommendationsCount } =
        useCanRecommendRecipes();

    if (pathname === ROUTES.NEW_RECIPE || pathname.startsWith(ROUTES.EDIT_RECIPE)) {
        return null;
    }

    return (
        <Flex
            display={{ base: 'none', md: 'flex' }}
            data-test-id='user-stats-block'
            direction='column'
            justifyContent='space-between'
            mt={{ md: '80px', base: '0' }}
            zIndex='1'
            w={{ md: '190px', base: '0' }}
            position='relative'
        >
            <Flex
                direction='column'
                alignItems='center'
                justify='center'
                position='fixed'
                gap='24px'
                w={{ base: '203px', md: '208px' }}
                p={{ base: '0 16px', md: '16px 56px' }}
                h={{ base: '24px', md: '200px' }}
                fontFamily='var(--font-family)'
                fontWeight='600'
                fontSize='16px'
                lineHeight='150%'
                color='var(--lime-600)'
            >
                {canRecommend && <ActionIcon image={fingerUpBlack} count={recommendationsCount} />}
                <ActionIcon image={bookmarkHeart} count={countBookmarks} />
                <ActionIcon image={peopleFill} count={subscriberCount} />
                <ActionIcon image={emojiHeartEyes} count={countLikes} />
            </Flex>
            <Flex
                position='fixed'
                bottom='0'
                display={{ base: 'none', md: 'flex' }}
                direction='column'
                justify='center'
                align='center'
                w='208px'
                h='208px'
                background='radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 0.6) 0%, rgba(255, 255, 255, 0) 100%)'
            >
                <Link data-test-id='add-recipe-button' to={ROUTES.NEW_RECIPE}>
                    <Box
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        gap='12px'
                        p='0px 12px'
                    >
                        <Image src={iconButton} w='48px' h='48px' />
                        <Text fontWeight='400' fontSize='12px' lineHeight='133%'>
                            Записать рецепт
                        </Text>
                    </Box>
                </Link>
            </Flex>
        </Flex>
    );
};
