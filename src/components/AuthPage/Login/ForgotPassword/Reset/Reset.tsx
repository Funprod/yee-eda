import { Box, Button, Flex, ModalBody, ModalHeader, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ErrorNotification } from '~/components/ErrorNotification/ErrorNotification';
import { HTTP_STATUS } from '~/constants/httpStatusCodes';
import { useResetPasswordMutation } from '~/query/services/auth-api/auth-api';
import { setAppError, setAppLoader } from '~/store/app-slice';

import { InputField } from './InputField/InputField';

type FormData = {
    login: string;
    password: string;
    passwordConfirm: string;
};

type ResetProps = {
    email: string;
    setSuccess: (value: 'email' | 'reset' | null) => void;
    onClose: () => void;
};
export const Reset = ({ setSuccess, onClose, email }: ResetProps) => {
    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const dispatch = useDispatch();
    const [resetError, setResetError] = useState<{
        title: string;
        message: string;
    } | null>(null);

    const [reset, { error, isLoading }] = useResetPasswordMutation();

    const onSubmit = async (values: FormData) => {
        const trimmed = {
            login: values.login.trim(),
            password: values.password.trim(),
            passwordConfirm: values.passwordConfirm.trim(),
        };

        const response = await reset({ email, ...trimmed });
        if (response.data) {
            setSuccess('reset');
            onClose();
            dispatch(setAppLoader(false));
        }
        if (response.error) {
            dispatch(setAppError({ title: 'Ошибка сервера', message: 'Попробуйте немного позже' }));
            dispatch(setAppLoader(false));
        }
    };

    useEffect(() => {
        if (error) {
            if (
                error &&
                typeof error === 'object' &&
                'status' in error &&
                error.status === HTTP_STATUS.SERVER_ERROR
            ) {
                setResetError({
                    title: 'Ошибка сервера',
                    message: 'Попробуйте немного позже',
                });
            }
            const timer = setTimeout(() => {
                setResetError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (isLoading) {
            dispatch(setAppLoader(true));
        }
    }, [dispatch, isLoading]);

    const handleInputChange =
        (fieldName: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(fieldName, e.target.value, {
                shouldValidate: true,
                shouldDirty: true,
            });
        };

    const handleLoginBlur =
        (fieldName: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const trimmed = e.target.value.trim();
            setValue(fieldName, trimmed, {
                shouldValidate: true,
                shouldDirty: true,
            });
        };

    return (
        <Flex direction='column' align='center'>
            <Box w={{ md: '396px', base: '270px' }}>
                <ModalHeader p='0' m={{ md: '32px 32px 0 32px', base: '32px 0 0 0' }}>
                    <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                        Восстановление <br /> аккаунта
                    </Text>
                </ModalHeader>
                <ModalBody m={{ md: '16px 32px 0 32px', base: '16px 0 0 0' }} p='0'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {resetError && (
                            <ErrorNotification
                                message={resetError.message}
                                title={resetError.title}
                            />
                        )}
                        <InputField
                            label='Логин для входа на сайт'
                            id='login'
                            placeholder='Логин'
                            name='login'
                            register={register}
                            validationRules={{
                                required: 'Введите логин',
                                minLength: { value: 5, message: 'Не соответствует формату' },
                                maxLength: { value: 50, message: 'Максимальная длина 50 символов' },
                                pattern: {
                                    value: /^[a-zA-Zа0-9!@#$&_+\-.]*$/,
                                    message: 'Не соответствует формату',
                                },
                            }}
                            errors={errors}
                            helperText='Логин не менее 5 символов, только латиница и !@#$&_+-.'
                            onChange={handleInputChange('login')}
                            onBlur={handleLoginBlur('login')}
                        />

                        <InputField
                            label='Пароль'
                            id='password'
                            data-test-id='password-input'
                            placeholder='Пароль для сайта'
                            name='password'
                            register={register}
                            validationRules={{
                                required: 'Введите пароль',
                                minLength: { value: 8, message: 'Не соответствует формату' },
                                maxLength: { value: 50, message: 'Максимальная длина 50 символов' },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$&_+\-.]{8,50}$/,
                                    message: 'Не соответствует формату',
                                },
                            }}
                            errors={errors}
                            helperText='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                            type='password'
                            onChange={handleInputChange('password')}
                            showPasswordToggle
                        />

                        <InputField
                            label='Повторите пароль'
                            id='confirmPassword'
                            data-test-id='confirm-password-input'
                            placeholder='Повторите пароль'
                            name='passwordConfirm'
                            register={register}
                            validationRules={{
                                required: 'Повторите пароль',
                                validate: (value) =>
                                    value === watch('password') || 'Пароли должны совпадать',
                            }}
                            errors={errors}
                            type='password'
                            onChange={handleInputChange('passwordConfirm')}
                            showPasswordToggle
                        />
                        <Button
                            data-test-id='submit-button'
                            colorScheme='teal'
                            isLoading={isSubmitting}
                            type='submit'
                            w='100%'
                            h='48px'
                            mt='42px'
                            mb='42px'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            borderRadius='6px'
                            bg='rgba(0, 0, 0, 0.92)'
                            _hover={{
                                bg: 'rgba(0, 0, 0, 0.7)',
                            }}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </ModalBody>
            </Box>
        </Flex>
    );
};
