import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    NumberInput,
    NumberInputField,
    Select,
    Text,
} from '@chakra-ui/react';
import {
    Control,
    FieldErrors,
    useFieldArray,
    UseFormRegister,
    UseFormWatch,
} from 'react-hook-form';

import { useMeasureUnitsQuery } from '~/query/services/recipe-api/recipe-api';

import { FormData } from '../NewRecipe';

type IngredientsProps = {
    register: UseFormRegister<FormData>;
    watch: UseFormWatch<FormData>;
    errors: FieldErrors<FormData>;
    control: Control<FormData>;
};

export const Ingredients = ({ register, errors, watch, control }: IngredientsProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const { data } = useMeasureUnitsQuery();

    const handleAddIngredient = () => append({ title: '', count: null, measureUnit: '' });

    if (!Array.isArray(data)) return null;

    return (
        <Flex w='100%' justify='center'>
            <Flex direction='column' gap='16px' w={{ md: '668px', sm: '604px', base: '328px' }}>
                <Flex gap='8px' align='center' textAlign='start'>
                    <Text
                        fontWeight='600'
                        fontSize={{ sm: '16px', base: '14px' }}
                        lineHeight='150%'
                        color='#000'
                    >
                        Добавьте ингредиенты рецепта, нажав на
                    </Text>
                    <IconButton
                        icon={<AddIcon m='0' w='8px' h='8px' />}
                        aria-label='Добавить ингредиент'
                        bg='transparent'
                        minW='0px'
                        w='16px'
                        h='16px'
                        p='0'
                        border='1px solid #000'
                        borderRadius='50%'
                    />
                </Flex>
                <Flex display={{ sm: 'flex', base: 'none' }}>
                    <Text
                        fontWeight='700'
                        fontSize='12px'
                        lineHeight='133%'
                        letterSpacing='0.05em'
                        color='#2db100'
                        w={{ md: '293px', sm: '241px', base: '328px' }}
                        pl='24px'
                    >
                        Ингредиент
                    </Text>
                    <Text
                        fontWeight='700'
                        fontSize='12px'
                        lineHeight='133%'
                        letterSpacing='0.05em'
                        color='#2db100'
                        pl={{ md: '24px', base: '14px' }}
                    >
                        Количество
                    </Text>
                    <Text
                        fontWeight='700'
                        fontSize='12px'
                        lineHeight='133%'
                        letterSpacing='0.05em'
                        color='#2db100'
                        pl='44px'
                    >
                        Единица измерения
                    </Text>
                </Flex>
                {fields.map((item, index) => (
                    <Flex
                        key={item.id}
                        gap='10px'
                        align={{ sm: 'center', base: 'flex-start' }}
                        h={{ sm: '40px', base: '100%' }}
                        mt={{ md: '16px', base: '0' }}
                        direction={{ sm: 'row', base: 'column' }}
                    >
                        <FormControl
                            isInvalid={!!errors.ingredients?.[index]?.title}
                            maxW={{ md: '293px', sm: '241px', base: '328px' }}
                            w='100%'
                        >
                            <FormLabel m='0'>
                                <Input
                                    data-test-id={`recipe-ingredients-title-${index}`}
                                    placeholder='Ингредиент'
                                    borderRadius='6px'
                                    {...register(`ingredients.${index}.title`, {
                                        required: 'Введите название рецепта',
                                        maxLength: {
                                            value: 50,
                                            message: 'Максимальная длина 50 символов',
                                        },
                                    })}
                                    _placeholder={{
                                        fontWeight: '400',
                                        fontSize: '18px',
                                        lineHeight: '150%',
                                        color: 'rgba(0, 0, 0, 0.64)',
                                    }}
                                />
                            </FormLabel>
                        </FormControl>
                        <Flex align='center'>
                            <FormControl
                                isInvalid={!!errors.ingredients?.[index]?.count}
                                m='0'
                                w='90px'
                            >
                                <NumberInput border='1px solid #e2e8f0'>
                                    <NumberInputField
                                        placeholder='100'
                                        data-test-id={`recipe-ingredients-count-${index}`}
                                        borderRadius='6px'
                                        {...register(`ingredients.${index}.count`, {
                                            required: 'Введите количество',
                                            valueAsNumber: true,
                                            validate: (value) => {
                                                if (value === null) return 'Введите количество';
                                                if (value <= 0) return 'Только положительное число';
                                                return true;
                                            },
                                        })}
                                    />
                                </NumberInput>
                            </FormControl>
                            <FormControl
                                isInvalid={!!errors.ingredients?.[index]?.measureUnit}
                                maxW={{ sm: '215px', base: '192px' }}
                                w='100%'
                                ml='10px'
                                mr={{ sm: '10px', base: '10px' }}
                            >
                                <FormLabel m='0'>
                                    <Select
                                        data-test-id={`recipe-ingredients-measureUnit-${index}`}
                                        placeholder='Единица измерения'
                                        {...register(`ingredients.${index}.measureUnit`, {
                                            required: 'Выберите единицу измерения',
                                        })}
                                        value={watch(`ingredients.${index}.measureUnit`) || ''}
                                        fontWeight='400'
                                        fontSize='18px'
                                        lineHeight='150%'
                                        color={
                                            !watch(`ingredients.${index}.measureUnit`)
                                                ? 'rgba(0, 0, 0, 0.64)'
                                                : 'black'
                                        }
                                        _placeholder={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxW: '100%',
                                        }}
                                    >
                                        {data.map((item) => (
                                            <option key={item._id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </Select>
                                </FormLabel>
                            </FormControl>
                            {index === fields.length - 1 ? (
                                <IconButton
                                    data-test-id='recipe-ingredients-add-ingredients'
                                    icon={<AddIcon m='0' w='14px' h='14px' color='#FFFFD3' />}
                                    aria-label='Добавить ингредиент'
                                    bg='#000'
                                    onClick={handleAddIngredient}
                                    minW='0px'
                                    w='32px'
                                    h='32px'
                                    p='0'
                                    border='1px solid #000'
                                    borderRadius='50%'
                                />
                            ) : (
                                <IconButton
                                    data-test-id={`recipe-ingredients-remove-ingredients-${index}`}
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
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};
