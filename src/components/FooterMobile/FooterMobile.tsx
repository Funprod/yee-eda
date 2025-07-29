import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { GetMeResponse } from '~/query/services/users-api/users-api.type';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

import main from './../../assets/footerMobile/main.svg';
import profile from './../../assets/footerMobile/profile.svg';
import search from './../../assets/footerMobile/search.svg';
import write from './../../assets/footerMobile/write.svg';

const buttonList = [
    {
        icon: main,
        title: 'Главная',
        path: ROUTES.HOME,
    },
    {
        icon: search,
        title: 'Поиск',
        path: ROUTES.HOME,
    },
    {
        icon: write,
        title: 'Записать',
        path: ROUTES.NEW_RECIPE,
    },
    {
        icon: profile,
        title: 'Мой профиль',
        path: ROUTES.PROFILE,
    },
];

type FooterMobileProps = {
    openBurger?: boolean;
    profileData: GetMeResponse;
};

export const FooterMobile = ({ openBurger, profileData }: FooterMobileProps) => {
    const navigate = useNavigate();

    const handleButton = (path: string) => {
        navigate(path);
    };

    return (
        <Flex
            display={{ base: 'flex', md: 'none' }}
            filter={openBurger ? 'blur(4px)' : 'none'}
            transition='filter 0.2s ease-out'
            data-test-id='footer'
            position='sticky'
            bottom='0'
            h='84px'
            w='100%'
            bgColor='var(--lime-50)'
            zIndex='5'
        >
            {buttonList.map((item, index) => (
                <Button
                    data-test-id={item.title === 'Мой профиль' ? 'footer-profile-button' : ''}
                    onClick={() => handleButton(item.path)}
                    key={item.title}
                    w='100%'
                    h='100%'
                    bg={
                        index === 0
                            ? 'radial-gradient(50% 50% at 50% 50%, rgba(196, 255, 97, 1) 0%, rgba(255, 255, 255, 0) 100%)'
                            : 'transparent'
                    }
                >
                    <Flex direction='column' align='center'>
                        <Avatar
                            src={
                                item.title === 'Мой профиль'
                                    ? getFullMediaUrl(profileData.photoLink)
                                    : item.icon
                            }
                            name={`${profileData.firstName} ${profileData.lastName}`}
                            width='40px'
                            height='40px'
                            borderRadius='full'
                        />
                        <Text fontWeight='500' fontSize='12px' lineHeight='133%' textAlign='center'>
                            {item.title}
                        </Text>
                    </Flex>
                </Button>
            ))}
        </Flex>
    );
};
