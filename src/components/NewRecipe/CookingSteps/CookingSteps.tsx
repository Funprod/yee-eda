import { AddIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, Text } from '@chakra-ui/react';
import {
    Control,
    FieldErrors,
    useFieldArray,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

import { FormData } from '../NewRecipe';
import { Step } from './Step/Step';
import { StepsUploadImage } from './StepsUploadImage/StepsUploadImage';

type CookingStepsProps = {
    register: UseFormRegister<FormData>;
    watch: UseFormWatch<FormData>;
    errors: FieldErrors<FormData>;
    setValue: UseFormSetValue<FormData>;
    control: Control<FormData>;
};

export const CookingSteps = ({ register, watch, errors, setValue, control }: CookingStepsProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps',
    });

    const handleAddStep = () =>
        append({
            stepNumber: fields.length + 1,
            description: null,
            image: null,
        });

    return (
        <Flex w='100%' justify='center'>
            <Flex direction='column' gap='16px' w={{ md: '668px', sm: '604px', base: '328px' }}>
                <Flex align='center' textAlign='start'>
                    <Text
                        fontWeight='600'
                        fontSize={{ sm: '16px', base: '14px' }}
                        lineHeight='150%'
                        color='#000'
                    >
                        Добавьте шаги приготовления
                    </Text>
                </Flex>
                {fields.map((field, index) => (
                    <Flex
                        key={field.id}
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        h={{ sm: '160px', base: '352px' }}
                        gap='20px'
                        direction={{ sm: 'row', base: 'column' }}
                    >
                        <StepsUploadImage
                            register={register}
                            watch={watch}
                            errors={errors}
                            setValue={setValue}
                            index={index}
                        />
                        <Step
                            index={index}
                            remove={remove}
                            fields={fields}
                            errors={errors}
                            register={register}
                        />
                    </Flex>
                ))}
                <Flex w='100%' justify='flex-end'>
                    <Button
                        w='123px'
                        h='32px'
                        borderRadius='6px'
                        border='1px solid rgba(0, 0, 0, 0.48)'
                        bg='rgba(255, 255, 255, 0.06)'
                        onClick={handleAddStep}
                        rightIcon={
                            <IconButton
                                icon={<AddIcon m='0' w='8px' h='8px' color='#FFF' />}
                                aria-label='Добавить ингредиент'
                                bg='#000'
                                minW='0px'
                                w='14px'
                                h='14px'
                                p='0'
                                border='1px solid #000'
                                borderRadius='50%'
                            />
                        }
                    >
                        <Text
                            fontWeight='600'
                            fontSize='14px'
                            lineHeight='143%'
                            color='rgba(0, 0, 0, 0.8)'
                        >
                            Новый шаг
                        </Text>
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
