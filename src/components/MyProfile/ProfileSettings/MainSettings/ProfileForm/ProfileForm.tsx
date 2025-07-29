import {
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import {
    FieldErrors,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

import { ProfileFormData } from '../MainSettings';

type ProfileFormProps = {
    onSubmit: (data: ProfileFormData) => void;
    register: UseFormRegister<ProfileFormData>;
    watch: UseFormWatch<ProfileFormData>;
    setValue: UseFormSetValue<ProfileFormData>;
    handleSubmit: UseFormHandleSubmit<ProfileFormData>;
    errors: FieldErrors<ProfileFormData>;
};

export const ProfileForm = ({
    onSubmit,
    register,
    watch,
    setValue,
    handleSubmit,
    errors,
}: ProfileFormProps) => {
    const handleBlur =
        (fieldName: keyof ProfileFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            const trimmed = e.target.value.trim();
            setValue(fieldName, trimmed, {
                shouldValidate: true,
                shouldDirty: true,
            });
        };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex wrap='wrap' gap={{ lg: '24px', base: '16px' }}>
                <FormControl
                    isInvalid={!!errors.firstName}
                    w={{ lg: '667px', md: '432px', sm: '356px', base: '328px' }}
                >
                    <FormLabel
                        htmlFor='firstName'
                        fontWeight='400'
                        fontSize='16px'
                        lineHeight='150%'
                    >
                        Имя
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
                <FormControl
                    isInvalid={!!errors.lastName}
                    w={{ lg: '667px', md: '432px', sm: '356px', base: '328px' }}
                >
                    <FormLabel
                        htmlFor='lastName'
                        fontWeight='400'
                        fontSize='16px'
                        lineHeight='150%'
                    >
                        Фамилия
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
                <FormControl w={{ lg: '667px', md: '432px', sm: '356px', base: '328px' }}>
                    <FormLabel htmlFor='email' fontWeight='400' fontSize='16px' lineHeight='150%'>
                        E-mail
                    </FormLabel>
                    <Input
                        disabled
                        id='email'
                        value={watch('email')}
                        border='1px solid #d7ff94'
                        borderRadius='6px'
                        p='0 16px'
                        w='100%'
                        h='48px'
                        bg='#fff'
                        fontWeight='400'
                        fontSize='18px'
                        color='#134b00'
                    />
                </FormControl>
                <FormControl w={{ lg: '667px', md: '432px', sm: '356px', base: '328px' }}>
                    <FormLabel
                        htmlFor='login-input'
                        fontWeight='400'
                        fontSize='16px'
                        lineHeight='150%'
                    >
                        Логин
                    </FormLabel>
                    <Input
                        disabled
                        data-test-id='login-input'
                        id='login-input'
                        value={watch('login')}
                        border='1px solid #d7ff94'
                        borderRadius='6px'
                        p='0 16px'
                        w='100%'
                        h='48px'
                        bg='#fff'
                        fontWeight='400'
                        fontSize='18px'
                        color='#134b00'
                    />
                    <FormHelperText
                        color='rgba(0, 0, 0, 0.64)'
                        fontSize='12px'
                        fontWeight='400'
                        lineHeight='133%'
                    >
                        Логин не менее 5 символов, только латиница
                    </FormHelperText>
                </FormControl>
            </Flex>
        </form>
    );
};
