import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import fingerUpBlack from '~/assets/fingerUpBlack.svg';
import { ROUTES } from '~/constants/routes';
import { useCanRecommendRecipes } from '~/hooks/useCanRecommendRecipes';
import { GetMeResponse } from '~/query/services/users-api/users-api.type';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';
import peopleFill from './../../assets/actionBar/PeopleFill.svg';
import headerLogo from './../../assets/header/logo.svg';
import headerLogoMobile from './../../assets/header/logoMobile.svg';
import { ActionIcon } from './ActionIcon/ActionIcon';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';

type HeaderProps = {
    openBurger: boolean;
    onToggle: () => void;
    profileData: GetMeResponse;
    isDesktop: boolean;
};

export const Header = ({ openBurger, onToggle, profileData, isDesktop }: HeaderProps) => {
    const { canRecommend, countLikes, countBookmarks, subscriberCount, recommendationsCount } =
        useCanRecommendRecipes();

    return (
        <Flex
            align='center'
            justify='center'
            w='100%'
            h={{ md: '80px', base: '64px' }}
            color='black'
            position='fixed'
            zIndex='100'
            top='0'
            left='0'
            right='0'
            bg={openBurger ? '#fff' : 'var(--lime-50)'}
            data-test-id='header'
            as='header'
        >
            <Flex
                maxW={{ md: '1920px', sm: '728px', base: '100%' }}
                w='100%'
                justify='space-between'
                align='center'
                px={{ base: '8px', md: '24px' }}
            >
                <Link to={ROUTES.HOME} data-test-id='header-logo'>
                    <Image
                        display={{ base: 'none', sm: 'block' }}
                        src={headerLogo}
                        alt='Логотип сайта'
                        width='136px'
                        height='32px'
                    />
                    <Image
                        display={{ base: 'block', sm: 'none' }}
                        src={headerLogoMobile}
                        alt='Логотип сайта'
                        width='32px'
                        height='32px'
                        position='absolute'
                        top='16px'
                        left='16px'
                        zIndex='5'
                    />
                </Link>
                {!openBurger && (
                    <Flex as='nav' flex='1' display={{ base: 'none', md: 'block' }} ml='128px'>
                        <Breadcrumbs />
                    </Flex>
                )}
                <Link to={ROUTES.PROFILE} data-test-id='header-profile-button'>
                    <Flex
                        align='center'
                        maxW='432px'
                        h='48px'
                        display={{ base: 'none', md: 'flex' }}
                        mr='48px'
                    >
                        <Avatar
                            src={getFullMediaUrl(profileData.photoLink)}
                            name={`${profileData.firstName} ${profileData.lastName}`}
                            width='48px'
                            height='48px'
                            borderRadius='full'
                        />
                        <Box ml='12px'>
                            <Text fontSize='18px' fontWeight='500' color='black'>
                                {`${profileData.firstName} ${profileData.lastName}`}
                            </Text>
                            <Text fontSize='14px' fontWeight='400' color='rgba(0, 0, 0, 0.64)'>
                                @{profileData.login}
                            </Text>
                        </Box>
                    </Flex>
                </Link>
                <Flex align='center' display={{ base: 'flex', md: 'none' }}>
                    {!openBurger && (
                        <Flex
                            data-test-id={!isDesktop && 'user-stats-block'}
                            alignItems='center'
                            justify='center'
                            gap='24px'
                            w='203px'
                            h='24px'
                            fontFamily='var(--font-family)'
                            fontWeight='600'
                            fontSize='16px'
                            lineHeight='150%'
                            color='var(--lime-600)'
                        >
                            {canRecommend && (
                                <ActionIcon image={fingerUpBlack} count={recommendationsCount} />
                            )}
                            <ActionIcon image={bookmarkHeart} count={countBookmarks} />
                            <ActionIcon image={peopleFill} count={subscriberCount} />
                            <ActionIcon image={emojiHeartEyes} count={countLikes} />
                        </Flex>
                    )}
                    <Flex direction='column' align='flex-end'>
                        {!openBurger ? (
                            <Button
                                data-test-id='hamburger-icon'
                                w='48px'
                                h='48px'
                                bg='transparent'
                                _hover={{ bg: 'transparent' }}
                                onClick={onToggle}
                                aria-label='Open menu'
                            >
                                <Icon
                                    as={HamburgerIcon}
                                    w={openBurger ? '12px' : '24px'}
                                    h={openBurger ? '12px' : '24px'}
                                />
                            </Button>
                        ) : (
                            <Button
                                data-test-id='close-icon'
                                w='48px'
                                h='48px'
                                bg='transparent'
                                _hover={{ bg: 'transparent' }}
                                onClick={onToggle}
                                aria-label='Close menu'
                            >
                                <Icon
                                    as={CloseIcon}
                                    w={openBurger ? '12px' : '24px'}
                                    h={openBurger ? '12px' : '24px'}
                                />
                            </Button>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
