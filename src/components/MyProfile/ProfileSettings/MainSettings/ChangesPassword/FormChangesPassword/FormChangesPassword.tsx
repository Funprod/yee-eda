import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { ChangePasswordFormData } from '../ChangesPassword';
import { PasswordToggleIcon } from './PasswordToggleIcon/PasswordToggleIcon';

type FormChangesPasswordProps = {
    onSubmit: (data: ChangePasswordFormData) => void;
    register: UseFormRegister<ChangePasswordFormData>;
    watch: UseFormWatch<ChangePasswordFormData>;
    handleSubmit: UseFormHandleSubmit<ChangePasswordFormData>;
    errors: FieldErrors<ChangePasswordFormData>;
};

export const FormChangesPassword = ({
    onSubmit,
    register,
    watch,
    handleSubmit,
    errors,
}: FormChangesPasswordProps) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.password}>
                <FormLabel
                    htmlFor='currentPassword'
                    fontWeight='400'
                    fontSize='16px'
                    lineHeight='150%'
                >
                    Введите старый пароль
                </FormLabel>
                <Input
                    data-test-id='currentPassword-input'
                    id='currentPassword'
                    placeholder='Старый пароль'
                    type={showCurrentPassword ? 'text' : 'password'}
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
                    {errors.password && errors.password.message}
                </FormErrorMessage>
                <PasswordToggleIcon value={showCurrentPassword} setValue={setShowCurrentPassword} />
            </FormControl>
            <FormControl
                isInvalid={!!errors.newPassword}
                mt={errors?.password?.message ? '0' : '20px'}
            >
                <FormLabel htmlFor='newPassword' fontWeight='400' fontSize='16px' lineHeight='150%'>
                    Пароль
                </FormLabel>
                <Input
                    data-test-id='newPassword-input'
                    id='newPassword'
                    placeholder='Пароль для сайта'
                    type={showPassword ? 'text' : 'password'}
                    {...register('newPassword', {
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
                    {errors.newPassword && errors.newPassword.message}
                </FormErrorMessage>
                <PasswordToggleIcon value={showPassword} setValue={setShowPassword} />
            </FormControl>
            <FormControl
                isInvalid={!!errors.confirmPassword}
                mt={errors?.newPassword?.message ? '0' : '20px'}
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
                            value === watch('newPassword') || 'Пароли должны совпадать',
                    })}
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
                <PasswordToggleIcon value={showConfirmPassword} setValue={setShowConfirmPassword} />
            </FormControl>
        </form>
    );
};
