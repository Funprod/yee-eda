import { Alert, AlertIcon, CloseButton, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    setAppError,
    setAppSuccess,
    userErrorSelector,
    userSuccessSelector,
} from '~/store/app-slice';

type ErrorNotificationProps = {
    title?: string;
    message?: string;
    isAuthPage?: boolean;
    success?: { title: string; message: string } | null;
};

const ERROR_DISPLAY_DURATION_MS = 15000;

export const ErrorNotification = ({
    message,
    title,
    isAuthPage,
    success,
}: ErrorNotificationProps) => {
    const errorStatus = useSelector(userErrorSelector);
    const successStatus = useSelector(userSuccessSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (errorStatus || successStatus) {
            const timer = setTimeout(() => {
                dispatch(setAppError(null));
                dispatch(setAppSuccess(null));
            }, ERROR_DISPLAY_DURATION_MS);
            return () => clearTimeout(timer);
        }
    }, [errorStatus, dispatch, successStatus]);

    const handleClose = () => {
        dispatch(setAppError(null));
        dispatch(setAppSuccess(null));
    };
    return (
        <Alert
            data-test-id='error-notification'
            status={success ? 'success' : 'error'}
            position='fixed'
            bottom='80px'
            left={isAuthPage ? { md: '25%', base: '50%' } : '50%'}
            transform='translateX(-50%)'
            zIndex='toast'
            width='fit-content'
            w='332px'
            bg={success ? '#38a169' : '#e53e3e'}
        >
            <AlertIcon color='#fff' />
            <Flex direction='column'>
                <Text
                    data-test-id='error-notification-title'
                    fontWeight='700'
                    fontSize='16px'
                    color='#fff'
                    w='240px'
                >
                    {title}
                </Text>
                <Text
                    data-test-id='error-notification-description'
                    fontWeight='400'
                    fontSize='16px'
                    color='#fff'
                    w='300px'
                >
                    {message}
                </Text>
            </Flex>
            <CloseButton
                data-test-id='close-alert-button'
                position='absolute'
                right='12px'
                top='12px'
                onClick={handleClose}
                color='#fff'
                w='12px'
                h='12px'
                zIndex='10'
            />
        </Alert>
    );
};
