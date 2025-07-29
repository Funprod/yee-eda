import {
    Box,
    Flex,
    HStack,
    Image,
    ModalBody,
    ModalFooter,
    ModalHeader,
    PinInput,
    PinInputField,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Pin from '~/assets/pinImg.jpg';
import { ErrorNotification } from '~/components/ErrorNotification/ErrorNotification';
import { useCheckVerificationCodeMutation } from '~/query/services/auth-api/auth-api';
import { setAppLoader } from '~/store/app-slice';

const baseTestId = 'verification-code-input-';

const codeVerificationErrorMap: Record<number, { title: string; message: string }> = {
    500: {
        title: 'Ошибка сервера',
        message: 'Попробуйте немного позже',
    },
};

type CodeProps = {
    email: string;
    setStep: (step: 'email' | 'code' | 'reset') => void;
};

export const Code = ({ email, setStep }: CodeProps) => {
    const [checkVerificationCode, { error, isLoading }] = useCheckVerificationCodeMutation();
    const [pinValue, setPinValue] = useState('');
    const [codeError, setCodeError] = useState<{
        title: string;
        message: string;
    } | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);
    const dispatch = useDispatch();
    const onComplete = async (value: string) => {
        const response = await checkVerificationCode({ email, otpToken: value });
        if (response.data) {
            setStep('reset');
            dispatch(setAppLoader(false));
        }
        if (response.error) {
            setPinValue('');
            setHasError(true);
            dispatch(setAppLoader(false));
        }
    };

    const handleChange = (value: string) => {
        setPinValue(value);
        if (hasError) {
            setHasError(false);
        }
    };

    useEffect(() => {
        if (error && typeof error === 'object' && 'status' in error) {
            const mappedError = codeVerificationErrorMap[error.status as number];

            if (mappedError) {
                setCodeError(mappedError);
            }

            const timer = setTimeout(() => {
                setCodeError(null);
                setHasError(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [error, setHasError]);

    useEffect(() => {
        if (isLoading) {
            dispatch(setAppLoader(true));
        }
    }, [dispatch, isLoading]);

    return (
        <Flex direction='column' align='center'>
            {codeError && <ErrorNotification message={codeError.message} title={codeError.title} />}
            <Flex direction='column' align='center'>
                <Image
                    src={Pin}
                    w={{ md: '206px', base: '108px' }}
                    h={{ md: '206px', base: '108px' }}
                    mt='32px'
                />
                <Box w={{ md: '396px', base: '270px' }}>
                    <ModalHeader p='0' m={{ md: '32px 32px 0 32px', base: '32px 0 0 0' }}>
                        <Box>
                            {hasError && (
                                <Text
                                    fontWeight='700'
                                    fontSize='24px'
                                    lineHeight='133%'
                                    color='#000'
                                    textAlign='center'
                                >
                                    Неверный код
                                </Text>
                            )}
                            <Text
                                fontWeight='400'
                                fontSize='16px'
                                lineHeight='150%'
                                textAlign='center'
                                whiteSpace={{ md: 'normal', base: 'pre-line' }}
                            >
                                Мы отправили вам на e-mail
                                <Text fontWeight='600'>{email}</Text>
                                шестизначный код.{'\n'} Введите его ниже.
                            </Text>
                        </Box>
                    </ModalHeader>
                    <ModalBody m={{ md: '16px 32px 0 32px', base: '16px 0 0 0' }} p='0'>
                        <HStack m={{ md: '0 32px', base: '0' }}>
                            <PinInput
                                otp
                                onComplete={onComplete}
                                isInvalid={hasError}
                                value={pinValue}
                                onChange={handleChange}
                            >
                                <PinInputField data-test-id={baseTestId + '1'} />
                                <PinInputField data-test-id={baseTestId + '2'} />
                                <PinInputField data-test-id={baseTestId + '3'} />
                                <PinInputField data-test-id={baseTestId + '4'} />
                                <PinInputField data-test-id={baseTestId + '5'} />
                                <PinInputField data-test-id={baseTestId + '6'} />
                            </PinInput>
                        </HStack>
                    </ModalBody>
                    <ModalFooter display='flex' p='0' m='24px 32px 32px 32px'>
                        <Text
                            fontWeight='400'
                            fontSize='12px'
                            lineHeight='133%'
                            color='rgba(0, 0, 0, 0.48)'
                            w='100%'
                            textAlign='center'
                        >
                            Не пришло письмо? Проверьте папку Спам.
                        </Text>
                    </ModalFooter>
                </Box>
            </Flex>
        </Flex>
    );
};
