import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { FormData } from '../NewRecipe';

type MainInfoProps = {
    register: UseFormRegister<FormData>;
    watch: UseFormWatch<FormData>;
    errors: FieldErrors<FormData>;
};

export const MainInfo = ({ register, watch, errors }: MainInfoProps) => (
    <Flex direction='column' w='100%' gap={{ md: '24px', base: '16px' }}>
        <FormControl isInvalid={!!errors.title}>
            <FormLabel m='0'>
                <Input
                    data-test-id='recipe-title'
                    placeholder='Название рецепта'
                    border='1px solid #d7ff94'
                    borderRadius='6px'
                    {...register('title', {
                        required: 'Введите название рецепта',
                        maxLength: {
                            value: 50,
                            message: 'Максимальная длина 50 символов',
                        },
                    })}
                    value={watch('title')}
                    _placeholder={{
                        fontWeight: '400',
                        fontSize: '18px',
                        lineHeight: '150%',
                        color: 'rgba(0, 0, 0, 0.64)',
                    }}
                />
            </FormLabel>
        </FormControl>
        <FormControl isInvalid={!!errors.description}>
            <FormLabel m='0'>
                <Textarea
                    data-test-id='recipe-description'
                    placeholder='Краткое описание рецепта'
                    border='1px solid #e2e8f0'
                    h='80px'
                    borderRadius='6px'
                    {...register('description', {
                        required: 'Введите краткое описание рецепта',
                        maxLength: {
                            value: 500,
                            message: 'Максимальная длина 500 символов',
                        },
                    })}
                    _placeholder={{
                        fontWeight: '400',
                        fontSize: '14px',
                        lineHeight: '143%',
                        color: 'rgba(0, 0, 0, 0.64)',
                    }}
                />
            </FormLabel>
        </FormControl>
        <FormControl isInvalid={!!errors.portions}>
            <FormLabel m='0'>
                <Flex gap={{ sm: '24px', base: '16px' }} align='center'>
                    <Text
                        fontWeight='600'
                        fontSize={{ sm: '16px', base: '14px' }}
                        lineHeight='150%'
                        maxW={{ sm: '100%', base: '220px' }}
                    >
                        На сколько человек ваш рецепт?
                    </Text>
                    <NumberInput border='1px solid #e2e8f0' w='90px'>
                        <NumberInputField
                            data-test-id='recipe-portions'
                            borderRadius='6px'
                            {...register('portions', {
                                required: 'Введите количество порций',
                                min: { value: 1, message: 'Только положительное число' },
                                max: { value: 10000, message: 'не более 10000' },
                                validate: (value) => !isNaN(+value) || 'Должно быть числом',
                                valueAsNumber: true,
                            })}
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
            </FormLabel>
        </FormControl>
        <FormControl isInvalid={!!errors.time}>
            <FormLabel m='0'>
                <Flex gap={{ sm: '24px', base: '16px' }} align='center'>
                    <Text
                        fontWeight='600'
                        fontSize={{ sm: '16px', base: '14px' }}
                        lineHeight='150%'
                        maxW={{ sm: '100%', base: '220px' }}
                    >
                        Сколько времени готовить в минутах?
                    </Text>
                    <NumberInput border='1px solid #e2e8f0' w='90px'>
                        <NumberInputField
                            data-test-id='recipe-time'
                            borderRadius='6px'
                            {...register('time', {
                                required: 'Введите время приготовления',
                                min: { value: 1, message: 'Только положительное число' },
                                max: { value: 10000, message: 'не более 10000' },
                                validate: (value) => !isNaN(+value) || 'Должно быть числом',
                                valueAsNumber: true,
                            })}
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
            </FormLabel>
        </FormControl>
    </Flex>
);
