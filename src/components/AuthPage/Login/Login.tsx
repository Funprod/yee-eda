import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { ErrorNotification } from '~/components/ErrorNotification/ErrorNotification';
import { HTTP_STATUS } from '~/constants/httpStatusCodes';
import { ROUTES } from '~/constants/routes';
import { useHealthMutation, useLoginMutation } from '~/query/services/auth-api/auth-api';
import { setAppLoader } from '~/store/app-slice';

import { ForgotPassword } from './ForgotPassword/ForgotPassword';

const loginErrorMap: Record<number, { title: string; message: string }> = {
    401: { title: 'Неверный логин или пароль', message: 'Попробуйте снова' },
    403: { title: 'E-mail не верифицирован', message: 'Проверьте почту и перейдите по ссылке' },
};

type FormData = {
    login: string;
    password: string;
};

type LoginProps = {
    repeatLogin: boolean;
    setSuccess: (value: 'email' | 'reset' | null) => void;
    onOpen: () => void;
    setRepeatLogin: (value: boolean) => void;
    setAuthModal: (value: 'sendEmail' | 'notSuccess' | 'health') => void;
};

export const Login = ({
    setSuccess,
    onOpen,
    repeatLogin,
    setRepeatLogin,
    setAuthModal,
}: Partial<LoginProps>) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [health] = useHealthMutation();
    const [login, { error, data, isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();
    const [showPassword, setShowPassword] = useState(false);
    const [submittedData, setSubmittedData] = useState<FormData | null>(null);
    const [loginError, setLoginError] = useState<{ title: string; message: string } | null>(null);

    const onSubmit = useCallback(
        async (values: FormData) => {
            dispatch(setAppLoader(true));
            const trimmed = {
                login: values.login.trim(),
                password: values.password.trim(),
            };

            setSubmittedData(trimmed);
            setRepeatLogin?.(false);
            const responseHealth = await health({ echo: 'health' });

            if (responseHealth.error) {
                onOpen?.();
                dispatch(setAppLoader(false));
                return;
            }
            login(trimmed);
        },
        [dispatch, health, login, onOpen, setRepeatLogin],
    );

    useEffect(() => {
        if (data) {
            dispatch(setAppLoader(false));
            navigate(ROUTES.HOME);
        }
    }, [data, dispatch, navigate]);

    useEffect(() => {
        if (error && typeof error === 'object' && 'status' in error) {
            const { status } = error;

            if (status === HTTP_STATUS.SERVER_ERROR) {
                setAuthModal?.('health');
                onOpen?.();
            }

            const mappedError = loginErrorMap[status as number];
            if (mappedError) {
                setLoginError(mappedError);

                const timer = setTimeout(() => {
                    setLoginError(null);
                }, 7000);
                return () => clearTimeout(timer);
            }
        }
    }, [error, onOpen, setAuthModal]);

    useEffect(() => {
        if (repeatLogin && submittedData) {
            onSubmit(submittedData);
        }
    }, [onSubmit, repeatLogin, submittedData]);

    useEffect(() => {
        if (isLoading) {
            dispatch(setAppLoader(true));
        }
    }, [dispatch, isLoading]);

    const handleLoginBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.trim();
    };

    return (
        <>
            {loginError && (
                <ErrorNotification
                    message={loginError.message}
                    title={loginError.title}
                    isAuthPage
                />
            )}
            <Flex direction='column' h='468px' align='center'>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    data-test-id={location.pathname !== ROUTES.REGISTRATION ? 'sign-in-form' : ''}
                >
                    <VStack w={{ md: '461px', sm: '355px', base: '328px' }}>
                        <FormControl isInvalid={!!errors.login}>
                            <FormLabel
                                htmlFor='login'
                                fontWeight='400'
                                fontSize='16px'
                                lineHeight='150%'
                            >
                                Логин для входа на сайт
                            </FormLabel>
                            <Input
                                data-test-id={
                                    location.pathname === ROUTES.AUTH ? 'login-input' : ''
                                }
                                id='login'
                                placeholder='Введите логин'
                                {...register('login', {
                                    required: 'Введите логин',
                                    minLength: { value: 2, message: 'Минимум 2 символа' },
                                    maxLength: {
                                        value: 50,
                                        message: 'Максимальная длина 50 символов',
                                    },
                                })}
                                onBlur={handleLoginBlur}
                                border={error ? '2px solid #e53e3e' : '1px solid #d7ff94'}
                                borderRadius='6px'
                                p='0 16px'
                                w='100%'
                                h='48px'
                                bg='#fff'
                                fontWeight='400'
                                fontSize='18px'
                                color='#134b00'
                                _placeholder={{
                                    fontWeight: '400',
                                    fontSize: '18px',
                                    color: '#134b00',
                                }}
                            />
                            <FormErrorMessage>
                                {errors.login && errors.login.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.password} mt='24px'>
                            <FormLabel
                                htmlFor='password'
                                fontWeight='400'
                                fontSize='16px'
                                lineHeight='150%'
                            >
                                Пароль
                            </FormLabel>
                            <Input
                                data-test-id={
                                    location.pathname !== ROUTES.REGISTRATION
                                        ? 'password-input'
                                        : ''
                                }
                                id='password'
                                placeholder='Пароль для сайта'
                                type={showPassword ? 'text' : 'password'}
                                {...register('password', {
                                    required: 'Введите пароль',
                                    minLength: { value: 2, message: 'Минимум 2 символа' },
                                    maxLength: {
                                        value: 50,
                                        message: 'Максимальная длина 50 символов',
                                    },
                                })}
                                onBlur={handleLoginBlur}
                                border={error ? '2px solid #e53e3e' : '1px solid #d7ff94'}
                                borderRadius='6px'
                                p='0 50px 0 16px'
                                w='100%'
                                h='48px'
                                bg='#fff'
                                fontWeight='400'
                                fontSize='18px'
                                color='#134b00'
                                _placeholder={{
                                    fontWeight: '400',
                                    fontSize: '18px',
                                    color: '#134b00',
                                }}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                            <IconButton
                                data-test-id='password-visibility-button'
                                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                                icon={
                                    showPassword ? (
                                        <ViewIcon w='18px' h='18px' />
                                    ) : (
                                        <ViewOffIcon w='18px' h='18px' />
                                    )
                                }
                                onMouseDown={() => setShowPassword(true)}
                                onMouseUp={() => setShowPassword(false)}
                                onMouseLeave={() => setShowPassword(false)}
                                variant='link'
                                position='absolute'
                                right='10px'
                                top='38px'
                                transform='translateY(50%)'
                                zIndex='1'
                                color='#000'
                            />
                        </FormControl>
                        <Button
                            data-test-id={
                                location.pathname !== ROUTES.REGISTRATION ? 'submit-button' : ''
                            }
                            mt={112}
                            colorScheme='teal'
                            isLoading={isSubmitting}
                            type='submit'
                            w='100%'
                            h='48px'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            bg='rgba(0, 0, 0, 0.92)'
                            _hover={{
                                bg: 'rgba(0, 0, 0, 0.7)',
                            }}
                        >
                            Войти
                        </Button>
                    </VStack>
                </form>
                <ForgotPassword setSuccess={setSuccess!} />
            </Flex>
        </>
    );
};
