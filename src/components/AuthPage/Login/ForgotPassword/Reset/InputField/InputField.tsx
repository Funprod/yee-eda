import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

type InputFieldProps<T extends FieldValues, Name extends Path<T> = Path<T>> = {
    label: string;
    id: string;
    placeholder: string;
    name: Name;
    validationRules: RegisterOptions<T, Name>;
    errors: FieldErrors<T>;
    type?: string;
    helperText?: string;
    showPasswordToggle?: boolean;
    register: UseFormRegister<T>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const inputId: Record<string, string> = {
    login: 'login-input',
    password: 'password-input',
    passwordConfirm: 'confirm-password-input',
};

export function InputField<T extends FieldValues>({
    label,
    id,
    placeholder,
    name,
    register,
    errors,
    helperText,
    type = 'text',
    onChange,
    onBlur,
    validationRules,
    showPasswordToggle = false,
}: InputFieldProps<T>) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPasswordToggle && showPassword ? 'text' : type;

    return (
        <FormControl isInvalid={!!errors[name]} position='relative' mt='20px'>
            <FormLabel htmlFor={id} fontWeight='400' fontSize='16px' lineHeight='150%'>
                {label}
            </FormLabel>
            <Input
                data-test-id={inputId[name]}
                id={id}
                placeholder={placeholder}
                type={inputType}
                {...register(name, validationRules)}
                onChange={onChange}
                onBlur={onBlur}
                border='1px solid #d7ff94'
                borderRadius='6px'
                p={showPasswordToggle ? '0 40px 0 16px' : '0 16px'}
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
            {helperText && (
                <FormHelperText
                    color='rgba(0, 0, 0, 0.64)'
                    fontSize='12px'
                    fontWeight='400'
                    lineHeight='133%'
                    mt='2'
                >
                    {helperText}
                </FormHelperText>
            )}
            <FormErrorMessage>
                {typeof errors[name]?.message === 'string' ? errors[name]?.message : null}
            </FormErrorMessage>

            {showPasswordToggle && (
                <IconButton
                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                    icon={
                        showPassword ? (
                            <ViewIcon w='18px' h='18px' />
                        ) : (
                            <ViewOffIcon w='18px' h='18px' />
                        )
                    }
                    onMouseDown={() => setShowPassword(!showPassword)}
                    onMouseUp={() => setShowPassword(!showPassword)}
                    onMouseLeave={() => setShowPassword(false)}
                    variant='link'
                    position='absolute'
                    right='6px'
                    top='38px'
                    transform='translateY(50%)'
                    zIndex={1}
                    color='#000'
                    tabIndex={-1}
                />
            )}
        </FormControl>
    );
}
