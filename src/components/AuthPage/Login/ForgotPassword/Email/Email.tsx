import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Forgot from '~/assets/Forgot.jpg';
import { ErrorNotification } from '~/components/ErrorNotification/ErrorNotification';
import { useForgotPasswordMutation } from '~/query/services/auth-api/auth-api';

const errorMap: Record<number, { title: string; message: string }> = {
    403: {
        title: 'Такого e-mail нет',
        message: 'Попробуйте другой e-mail или проверьте правильность его написания',
    },
    500: {
        title: 'Ошибка сервера',
        message: 'Попробуйте немного позже',
    },
};

type FormData = {
    email: string;
};

type EmailProps = {
    setStep: (step: 'email' | 'code' | 'reset') => void;
    setEmail: (email: string) => void;
};

export const Email = ({ setStep, setEmail }: EmailProps) => {
    const {
        handleSubmit: handleSubmitForgot,
        register: registerForgot,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>();
    const [forgotError, setForgotError] = useState<{
        title: string;
        message: string;
    } | null>(null);

    const [forgotPassword, { error }] = useForgotPasswordMutation();

    const onSubmit = async (values: FormData) => {
        const response = await forgotPassword(values);
        if (response.data) {
            setStep('code');
            setEmail(values.email);
        }
    };

    useEffect(() => {
        if (error && typeof error === 'object' && 'status' in error) {
            const mappedError = errorMap[error.status as number];
            if (mappedError) {
                setForgotError(mappedError);
                reset();
            }
        }
    }, [error, reset]);

    const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const trimmed = e.target.value.trim();
        setValue('email', trimmed, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    return (
        <Flex direction='column' align='center'>
            {forgotError && (
                <ErrorNotification message={forgotError.message} title={forgotError.title} />
            )}
            <Image
                src={Forgot}
                w={{ md: '206px', base: '108px' }}
                h={{ md: '206px', base: '108px' }}
                mt='32px'
            />
            <Box w={{ md: '332px', base: '270px' }}>
                <ModalHeader p='0' m={{ md: '32px 32px 0 32px', base: '32px 0 0 0' }}>
                    <Text fontWeight='400' fontSize='16px' lineHeight='150%' textAlign='center'>
                        Для восстановления входа введите ваш e-mail, куда можно отправить уникальный
                        код
                    </Text>
                </ModalHeader>
                <ModalBody m={{ md: '16px 32px 0 32px', base: '16px 0 0 0' }} p='0'>
                    <>
                        <form onSubmit={handleSubmitForgot(onSubmit)}>
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
                                    data-test-id='email-input'
                                    id='email'
                                    placeholder='e-mail'
                                    {...registerForgot('email', {
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
                                    onBlur={handleEmailBlur}
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
                                data-test-id='submit-button'
                                type='submit'
                                mt='24px'
                                w='100%'
                                bg='rgba(0, 0, 0, 0.92)'
                                borderRadius='6px'
                                h='48px'
                                _hover={{ bg: 'rgba(0, 0, 0, 0.92)' }}
                                color='#fff'
                                fontWeight='600'
                                fontSize='18px'
                                lineHeight='156%'
                            >
                                Получить код
                            </Button>
                        </form>
                    </>
                </ModalBody>
            </Box>

            <ModalFooter
                display='flex'
                p='0'
                m='24px 32px 32px 32px'
                fontWeight='400'
                fontSize='12px'
                lineHeight='133%'
                color='rgba(0, 0, 0, 0.48)'
                textAlign='center'
            >
                Не пришло письмо? Проверьте папку Спам.
            </ModalFooter>
        </Flex>
    );
};
