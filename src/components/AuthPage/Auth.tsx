import {
    Flex,
    Image,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import Rectangle from '~/assets/auth/Rectangle.jpg';
import logo from '~/assets/header/logo.svg';
import { ROUTES } from '~/constants/routes';
import { setAppSuccess, userSuccessSelector } from '~/store/app-slice';
import { ApplicationState } from '~/store/configure-store';

import { ErrorNotification } from '../ErrorNotification/ErrorNotification';
import { FullPageLoader } from '../FullPageLoader/FullPageLoader';
import { Login } from './Login/Login';
import { ModalComponent } from './Registration/ModalComponent';
import { FormData, Registration } from './Registration/Registration';

export const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const isLoading = useSelector((state: ApplicationState) => state.app.isLoading);
    const emailVerified = queryParams.get('emailVerified');
    const [success, setSuccess] = useState<'email' | 'reset' | null>(null);
    const globalSuccess = useSelector(userSuccessSelector);
    const [authModal, setAuthModal] = useState<'sendEmail' | 'notSuccess' | 'health'>('sendEmail');
    const [tabIndex, setTabIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [repeatLogin, setRepeatLogin] = useState<boolean>(false);
    const [formData, setFormData] = useState<Partial<FormData>>({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (emailVerified === 'true') {
            setSuccess('email');
            dispatch(
                setAppSuccess({
                    title: '',
                    message: 'Верификация прошла успешно',
                }),
            );
        }

        if (emailVerified === 'false') {
            navigate(ROUTES.REGISTRATION);
            setAuthModal('notSuccess');
            onOpen();
        }
    }, [dispatch, emailVerified, navigate, onOpen]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSuccess(null);
        }, 10000);
        return () => clearTimeout(timeout);
    }, [success]);

    useEffect(() => {
        if (location.pathname === ROUTES.AUTH) {
            setTabIndex(0);
        } else if (location.pathname === ROUTES.REGISTRATION) {
            setTabIndex(1);
        }
    }, [location.pathname]);

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
        if (index === 0) navigate(ROUTES.AUTH);
        else if (index === 1) navigate(ROUTES.REGISTRATION);
    };

    return (
        <Flex w='100%' h='100vh'>
            {isLoading && <FullPageLoader />}
            <Flex
                w='100%'
                h='100vh'
                filter={isLoading ? 'blur(2px)' : 'none'}
                transition='filter 0.2s ease-out'
                bg={isLoading ? 'rgba(0,0,0,0.1)' : 'transparent'}
            >
                <Flex
                    bg='linear-gradient(208deg, #eaffc7 0%, #29813f 100%)'
                    w='100%'
                    align='center'
                    justify='center'
                    direction='column'
                    position='relative'
                >
                    <Image
                        src={logo}
                        w={{ md: '270px', base: '158px' }}
                        h={{ md: '64px', base: '38px' }}
                    />
                    <Tabs
                        index={tabIndex}
                        onChange={handleTabsChange}
                        mt={{ md: '80px', sm: '56px', base: '40px' }}
                    >
                        <TabList
                            color='#134b00'
                            w={{ md: '461px', sm: '355px', base: '328px' }}
                            h='54px'
                            borderBottom='2px solid rgba(0, 0, 0, 0.08)'
                        >
                            <Tab
                                fontWeight='500'
                                fontSize='18px'
                                lineHeight='156%'
                                p='12px 24px'
                                w='163px'
                                h='54px'
                                _selected={{
                                    color: '#207e00',
                                    borderBottom: '2px solid #207e00',
                                }}
                            >
                                Вход на сайт
                            </Tab>
                            <Tab
                                fontWeight='500'
                                fontSize='18px'
                                lineHeight='156%'
                                p='12px 24px'
                                w='163px'
                                h='54px'
                                _selected={{
                                    color: '#207e00',
                                    borderBottom: '2px solid #207e00',
                                }}
                            >
                                Регистрация
                            </Tab>
                        </TabList>
                        <TabPanels mt='40px'>
                            <TabPanel p='0'>
                                <Login
                                    setSuccess={setSuccess}
                                    onOpen={onOpen}
                                    repeatLogin={repeatLogin}
                                    setRepeatLogin={setRepeatLogin}
                                    setAuthModal={setAuthModal}
                                />
                            </TabPanel>
                            <TabPanel p='0'>
                                <Registration
                                    onOpen={onOpen}
                                    setFormData={setFormData}
                                    formData={formData}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    {globalSuccess && (
                        <ErrorNotification
                            isAuthPage
                            success={globalSuccess}
                            message={globalSuccess.message}
                        />
                    )}
                    <ModalComponent
                        formData={formData}
                        isOpen={isOpen}
                        onClose={onClose}
                        authModal={authModal}
                        setRepeatLogin={setRepeatLogin}
                    />
                    <Text
                        fontWeight='600'
                        fontSize='12px'
                        lineHeight='133%'
                        color='#000'
                        position='absolute'
                        bottom={{ md: '30px', base: '20px' }}
                        left={{ md: '30px', base: '20px' }}
                    >
                        Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                    </Text>
                </Flex>
                <Flex w='100%' display={{ base: 'none', md: 'flex' }} position='relative'>
                    <Image w='100%' src={Rectangle} />
                    <Text
                        fontWeight='600'
                        fontSize='12px'
                        lineHeight='133%'
                        color='#000'
                        position='absolute'
                        bottom='30px'
                        right='30px'
                    >
                        - Лучший сервис для ваших кулинарных побед
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
};
