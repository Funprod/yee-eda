import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    Progress,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import { ErrorNotification } from '~/components/ErrorNotification/ErrorNotification';
import { ROUTES } from '~/constants/routes';
import { useSignUpMutation } from '~/query/services/auth-api/auth-api';
import { isFetchBaseQueryErrorWithMessage } from '~/utils/isFetchBaseQueryError';

const registrationErrorMap: Record<number, { title: string; message: string } | 'custom'> = {
    400: 'custom',
    500: {
        title: 'Ошибка сервера',
        message: 'Попробуйте немного позже',
    },
};

export type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
};

type RegistrationProps = {
    onOpen?: () => void;
    setFormData?: React.Dispatch<React.SetStateAction<Partial<FormData>>>;
    formData?: Partial<FormData>;
};

export const Registration = ({ onOpen, setFormData, formData }: RegistrationProps) => {
    const {
        handleSubmit,
        register,
        watch,
        reset,
        setValue,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState<1 | 2>(1);
    const [progress, setProgress] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const [registrationError, setRegistrationError] = useState<{
        title: string;
        message: string;
    } | null>(null);
    const [signUp, { error }] = useSignUpMutation();

    const handleNextStep = (data: Partial<FormData>) => {
        setFormData?.((prev) => ({ ...prev, ...data }));
        setStep(2);
        reset();
    };

    const handleFinalSubmit = async (data: Partial<FormData>) => {
        const finalData = { ...formData, ...data } as FormData;
        const response = await signUp(finalData);
        if (response.data) {
            onOpen?.();
            navigate(ROUTES.AUTH, { replace: true });
        }
    };

    const handleFieldChange =
        (fieldName: keyof FormData, progressValue: number) =>
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(fieldName, e.target.value, {
                shouldValidate: true,
                shouldDirty: true,
            });

            const valid = await trigger(fieldName);

            if (valid) {
                setProgress((prev) => Math.max(prev, progressValue));
            } else {
                setProgress((prev) => (prev >= progressValue ? 0 : prev));
            }
        };

    useEffect(() => {
        if (error && typeof error === 'object' && 'status' in error) {
            const mapped = registrationErrorMap[error.status as number];

            if (mapped === 'custom') {
                if (isFetchBaseQueryErrorWithMessage(error)) {
                    setRegistrationError({
                        title: '',
                        message: error.data.message,
                    });
                }
            } else if (mapped) {
                setRegistrationError(mapped);
            }
        }
    }, [error]);

    const handleBlur = (fieldName: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const trimmed = e.target.value.trim();
        setValue(fieldName, trimmed, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    return (
        <Flex direction='column' h='468px' align='center'>
            <form
                onSubmit={handleSubmit(step === 1 ? handleNextStep : handleFinalSubmit)}
                data-test-id='sign-up-form'
            >
                {registrationError && (
                    <ErrorNotification
                        message={registrationError.message}
                        title={registrationError.title}
                        isAuthPage
                    />
                )}
                <VStack w={{ md: '461px', sm: '355px', base: '328px' }}>
                    <Flex w='100%' textAlign='start'>
                        <Text fontWeight='400' fontSize='16px' lineHeight='150%'>
                            {step === 1 ? 'Шаг 1. Личная информация' : 'Шаг 2. Логин и пароль'}
                        </Text>
                    </Flex>
                    <Progress
                        data-test-id='sign-up-progress'
                        variant='custom'
                        value={progress}
                        w='100%'
                        h='8px'
                        hasStripe
                    />
                    {step === 1 && (
                        <>
                            <FormControl isInvalid={!!errors.firstName}>
                                <FormLabel
                                    htmlFor='firstName'
                                    fontWeight='400'
                                    fontSize='16px'
                                    lineHeight='150%'
                                >
                                    Ваше имя
                                </FormLabel>
                                <Input
                                    data-test-id='first-name-input'
                                    id='firstName'
                                    placeholder='Имя'
                                    {...register('firstName', {
                                        required: 'Введите имя',
                                        pattern: {
                                            value: /^[А-ЯЁ][А-Яа-яёЁA-Za-z -]*$/,
                                            message: 'Должно начинаться с кириллицы А-Я',
                                        },
                                        validate: {
                                            startsWithCyrillic: (value) =>
                                                /^[А-ЯЁ][А-Яа-яёЁ-]*$/.test(value) ||
                                                'Только кириллица А-Я, и "-"',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина 50 символов',
                                        },
                                    })}
                                    value={watch('firstName')}
                                    onChange={handleFieldChange('firstName', 17)}
                                    onBlur={handleBlur('firstName')}
                                    border='1px solid #d7ff94'
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
                                    {errors.firstName && errors.firstName.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.lastName} mt='20px'>
                                <FormLabel
                                    htmlFor='lastName'
                                    fontWeight='400'
                                    fontSize='16px'
                                    lineHeight='150%'
                                >
                                    Ваша фамилия
                                </FormLabel>
                                <Input
                                    data-test-id='last-name-input'
                                    id='lastName'
                                    placeholder='Фамилия'
                                    value={watch('lastName')}
                                    {...register('lastName', {
                                        required: 'Введите фамилию',
                                        pattern: {
                                            value: /^[А-ЯЁ][А-Яа-яёЁA-Za-z -]*$/,
                                            message: 'Должно начинаться с кириллицы А-Я',
                                        },
                                        validate: {
                                            startsWithCyrillic: (value) =>
                                                /^[А-ЯЁ][А-Яа-яёЁ-]*$/.test(value) ||
                                                'Только кириллица А-Я, и "-"',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина 50 символов',
                                        },
                                    })}
                                    onChange={handleFieldChange('lastName', 35)}
                                    onBlur={(e) => {
                                        const trimmed = e.target.value.trim();
                                        setValue('lastName', trimmed, {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                        });
                                    }}
                                    border='1px solid #d7ff94'
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
                                    {errors.lastName && errors.lastName.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={!!errors.email} mt='20px'>
                                <FormLabel
                                    htmlFor='email'
                                    fontWeight='400'
                                    fontSize='16px'
                                    lineHeight='150%'
                                >
                                    Ваш e-mail
                                </FormLabel>
                                <Input
                                    data-test-id={
                                        location.pathname === ROUTES.REGISTRATION
                                            ? 'email-input'
                                            : ''
                                    }
                                    id='email'
                                    placeholder='e-mail'
                                    {...register('email', {
                                        required: 'Введите e-mail',
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина 50 символов',
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'Введите корректный e-mail',
                                        },
                                    })}
                                    onChange={handleFieldChange('email', 50)}
                                    onBlur={handleBlur('email')}
                                    border='1px solid #d7ff94'
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
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>
                            <Button
                                data-test-id={
                                    location.pathname === ROUTES.REGISTRATION ? 'submit-button' : ''
                                }
                                mt='20px'
                                type='submit'
                                colorScheme='teal'
                                w='100%'
                                h='48px'
                                border='1px solid rgba(0, 0, 0, 0.08)'
                                borderRadius='6px'
                                bg='rgba(0, 0, 0, 0.92)'
                                _hover={{
                                    bg: 'rgba(0, 0, 0, 0.7)',
                                }}
                            >
                                Дальше
                            </Button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <FormControl isInvalid={!!errors.login}>
                                <FormLabel
                                    htmlFor='login-input'
                                    fontWeight='400'
                                    fontSize='16px'
                                    lineHeight='150%'
                                >
                                    Логин для входа на сайт
                                </FormLabel>
                                <Input
                                    data-test-id='login-input'
                                    id='login-input'
                                    placeholder='Логин'
                                    {...register('login', {
                                        required: 'Введите логин',
                                        minLength: {
                                            value: 5,
                                            message: 'Не соответствует формату',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина 50 символов',
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9!@#$&_+\-.]+$/,
                                            message: 'Не соответствует формату',
                                        },
                                    })}
                                    onChange={handleFieldChange('login', 67)}
                                    onBlur={handleBlur('login')}
                                    border='1px solid #d7ff94'
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
                                <FormHelperText
                                    color='rgba(0, 0, 0, 0.64)'
                                    fontSize='12px'
                                    fontWeight='400'
                                    lineHeight='133%'
                                >
                                    Логин не менее 5 символов, только латиница и !@#$&_+-.
                                </FormHelperText>
                                <FormErrorMessage mt='0'>
                                    {errors.login && errors.login.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors.password}
                                mt={errors?.login?.message ? '0' : '20px'}
                            >
                                <FormLabel
                                    htmlFor='password'
                                    fontWeight='400'
                                    fontSize='16px'
                                    lineHeight='150%'
                                >
                                    Пароль
                                </FormLabel>
                                <Input
                                    data-test-id='password-input'
                                    id='password'
                                    placeholder='Пароль для сайта'
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Введите пароль',
                                        minLength: {
                                            value: 8,
                                            message: 'Не соответствует формату',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина 50 символов',
                                        },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$&_+\-.]{8,50}$/,
                                            message: 'Не соответствует формату',
                                        },
                                    })}
                                    onChange={handleFieldChange('password', 85)}
                                    border='1px solid #d7ff94'
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
                                <FormHelperText
                                    color='rgba(0, 0, 0, 0.64)'
                                    fontSize='12px'
                                    fontWeight='400'
                                    lineHeight='133%'
                                >
                                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                                </FormHelperText>
                                <FormErrorMessage mt='0'>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                                <IconButton
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
                            <FormControl
                                isInvalid={!!errors.confirmPassword}
                                mt={errors?.password?.message ? '0' : '20px'}
                            >
                                <FormLabel
                                    htmlFor='confirmPassword'
                                    fontWeight='400'
                                    fontSize='16px'
                                    lineHeight='150%'
                                >
                                    Повторите пароль
                                </FormLabel>
                                <Input
                                    data-test-id='confirm-password-input'
                                    id='confirmPassword'
                                    placeholder='Повторите пароль'
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register('confirmPassword', {
                                        required: 'Повторите пароль',
                                        validate: (value) =>
                                            value === watch('password') ||
                                            'Пароли должны совпадать',
                                    })}
                                    onChange={handleFieldChange('confirmPassword', 100)}
                                    border='1px solid #d7ff94'
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
                                <FormErrorMessage mt='0'>
                                    {errors.confirmPassword && errors.confirmPassword.message}
                                </FormErrorMessage>
                                <IconButton
                                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                                    icon={
                                        showPassword ? (
                                            <ViewIcon w='18px' h='18px' />
                                        ) : (
                                            <ViewOffIcon w='18px' h='18px' />
                                        )
                                    }
                                    onMouseDown={() => setShowConfirmPassword(true)}
                                    onMouseUp={() => setShowConfirmPassword(false)}
                                    onMouseLeave={() => setShowConfirmPassword(false)}
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
                                data-test-id='submit-button'
                                colorScheme='teal'
                                isLoading={isSubmitting}
                                type='submit'
                                w='100%'
                                h='48px'
                                mt={errors?.confirmPassword?.message ? '0' : '20px'}
                                border='1px solid rgba(0, 0, 0, 0.08)'
                                borderRadius='6px'
                                bg='rgba(0, 0, 0, 0.92)'
                                _hover={{
                                    bg: 'rgba(0, 0, 0, 0.7)',
                                }}
                            >
                                Зарегистрироваться
                            </Button>
                        </>
                    )}
                </VStack>
            </form>
        </Flex>
    );
};
