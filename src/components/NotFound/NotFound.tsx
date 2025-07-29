import { Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

import { ROUTES } from '~/constants/routes';

import breakfast from './../../assets/Breakfast.jpg';
import headerLogo from './../../assets/header/logo.svg';
export const NotFound = () => (
    <Flex>
        <Flex
            data-test-id='header'
            as='header'
            align='center'
            justify='space-between'
            w='100%'
            height={{ md: '80px', base: '64px' }}
            bg='var(--lime-50)'
            color='black'
            position='fixed'
            zIndex='15'
            top='0'
            left='0'
            right='0'
            px={{ base: '8px', md: '24px' }}
        >
            <Link to={ROUTES.HOME}>
                <Image
                    display={{ base: 'none', sm: 'block' }}
                    src={headerLogo}
                    alt='Логотип сайта'
                    width='136px'
                    height='32px'
                />
            </Link>
        </Flex>
        <Flex w='100%' justify='center' h='100vh' align='center' direction='column' gap='32px'>
            <Image w={{ base: '108px', md: '206px' }} src={breakfast} />
            <Flex direction='column' gap='16px' align='center'>
                <Flex
                    fontWeight='700'
                    fontSize='24px'
                    lineHeight='133%'
                    w={{ base: '252px', md: '100%' }}
                    textAlign='center'
                >
                    <Text as='h1'> Упс! Такой страницы нет</Text>
                </Flex>
                <Text
                    fontWeight='400'
                    fontSize='16px'
                    lineHeight='150%'
                    color='rgba(0, 0, 0, 0.64)'
                    w={{ base: '252px', md: '100%' }}
                    textAlign='center'
                >
                    Можете поискать другой рецепт{' '}
                    <Link to={ROUTES.HOME} data-test-id='error-page-go-home'>
                        здесь.
                    </Link>
                </Text>
            </Flex>
        </Flex>
    </Flex>
);
