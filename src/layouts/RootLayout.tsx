import { Flex, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';

import { AsideBar } from '~/components/AsideBar/AsideBar';
import { ErrorNotification } from '~/components/ErrorNotification/ErrorNotification';
import { Footer } from '~/components/Footer/Footer';
import { FooterMobile } from '~/components/FooterMobile/FooterMobile';
import { FullPageLoader } from '~/components/FullPageLoader/FullPageLoader';
import { Header } from '~/components/Header/Header';
import { Sidebar } from '~/components/Sidebar/Sidebar';
import { useGetCategoriesQuery } from '~/query/services/category-api/category-api';
import { useGetMeQuery } from '~/query/services/users-api/users-api';
import {
    setAppError,
    userErrorSelector,
    userLoadingSelector,
    userSuccessSelector,
} from '~/store/app-slice';

export default function RootLayout() {
    const { isOpen: openBurger, onToggle, onClose } = useDisclosure();
    const [isDesktop] = useMediaQuery(`(min-width: 1024px)`);
    const isLoading = useSelector(userLoadingSelector);
    const error = useSelector(userErrorSelector);
    const success = useSelector(userSuccessSelector);
    const { data } = useGetCategoriesQuery();
    const { data: profileData } = useGetMeQuery();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (data && data.length > 0) {
            localStorage.setItem('cachedCategories', JSON.stringify(data));
        }
    }, [data]);
    useEffect(() => {
        if (isDesktop) {
            onClose();
        }
    }, [isDesktop, onClose]);

    useEffect(() => {
        const sessionError = sessionStorage.getItem('error');
        if (sessionError) {
            dispatch(setAppError({ title: 'Ошибка сервера', message: sessionError }));
            sessionStorage.removeItem('error');
        }
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    if (!profileData) return <FullPageLoader />;

    return (
        <Flex direction='column' align='center'>
            {isLoading && <FullPageLoader />}
            {(error || success) && (
                <ErrorNotification
                    title={error?.title || success?.title}
                    message={error?.message || success?.message}
                    success={success}
                />
            )}
            <Header
                openBurger={openBurger}
                onToggle={onToggle}
                profileData={profileData}
                isDesktop={isDesktop}
            />
            <Flex
                filter={isLoading ? 'blur(2px)' : 'none'}
                overflowX='clip'
                transition='filter 0.2s ease-out'
                position='relative'
                maxW='1920px'
                w='100%'
                justify={{ base: 'center', md: 'flex-start' }}
            >
                {isDesktop ? (
                    <Sidebar />
                ) : (
                    openBurger && <Sidebar openBurger={openBurger} onClose={onClose} />
                )}
                <Flex
                    direction='column'
                    align={{ base: 'center', md: 'flex-start' }}
                    filter={openBurger ? 'blur(4px)' : 'none'}
                    transition='filter 0.2s ease-out'
                    position='relative'
                    onClick={() => onClose()}
                    w={{
                        base: '328px',
                        sm: '728px',
                        md: '880px',
                        lg: '1360px',
                    }}
                    m={{ md: '80px 72px 32px 24px', base: '64px 16px 32px 16px' }}
                    minH='calc(100vh - 80px)'
                >
                    <Outlet />
                    <Footer />
                </Flex>
                {isDesktop && <AsideBar />}
            </Flex>
            <FooterMobile openBurger={openBurger} profileData={profileData} />
        </Flex>
    );
}
