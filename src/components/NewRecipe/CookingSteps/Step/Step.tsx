import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, FormControl, FormLabel, IconButton, Text, Textarea } from '@chakra-ui/react';
import {
    FieldArrayWithId,
    FieldErrors,
    UseFieldArrayRemove,
    UseFormRegister,
} from 'react-hook-form';

import { FormData } from '../../NewRecipe';

type StepProps = {
    index: number;
    fields: FieldArrayWithId<FormData, 'steps', 'id'>[];
    remove: UseFieldArrayRemove;
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
};

export const Step = ({ index, fields, remove, register, errors }: StepProps) => (
    <Flex direction='column' gap='16px' justify='center' p={{ sm: '0', base: '0 20px' }}>
        <Flex align='center' justify='space-between'>
            <Flex w='51px' h='20px' bg='rgba(0, 0, 0, 0.06)' justify='center' align='center'>
                <Text
                    fontWeight='600'
                    fontSize='12px'
                    lineHeight='133%'
                    letterSpacing='0.03em'
                    color='#000'
                >
                    Шаг {index + 1}
                </Text>
            </Flex>
            {fields.length > 1 && (
                <IconButton
                    data-test-id={index === 0 ? '' : `recipe-steps-remove-button-${index}`}
                    icon={<DeleteIcon color='#2DB100' w='12px' h='14px' />}
                    aria-label='Удалить ингредиент'
                    onClick={() => remove(index)}
                    minW='0px'
                    w='32px'
                    h='32px'
                    p='0'
                    bg='transparent'
                />
            )}
        </Flex>
        <FormControl isInvalid={!!errors.steps?.[index]?.description}>
            <FormLabel>
                <Textarea
                    data-test-id={`recipe-steps-description-${index}`}
                    placeholder='Шаг'
                    border='1px solid #e2e8f0'
                    h={{ sm: '84px', base: '116px' }}
                    w='282px'
                    borderRadius='6px'
                    {...register(`steps.${index}.description`, {
                        required: 'Введите краткое описание шага',
                        maxLength: {
                            value: 500,
                            message: 'Максимальная длина 500 символов',
                        },
                    })}
                    _placeholder={{
                        fontWeight: '400',
                        fontSize: '14px',
                        lineHeight: '143%',
                        color: 'rgba(0, 0, 0, 0.36)',
                    }}
                />
            </FormLabel>
        </FormControl>
    </Flex>
);
