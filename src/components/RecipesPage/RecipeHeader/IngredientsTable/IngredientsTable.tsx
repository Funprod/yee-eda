import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { RecipeData } from '~/query/services/recipe-api/recipe-api.type';

type IngredientsTableProps = {
    data: RecipeData;
};

export const IngredientsTable = ({ data }: IngredientsTableProps) => {
    const [servings, setServings] = useState(data?.portions || 1);
    const handleChange = (valueAsString: string, valueAsNumber: number) => {
        setServings(valueAsNumber || 1);
        valueAsString;
    };

    useEffect(() => {
        if (data?.portions) {
            setServings(data?.portions);
        }
    }, [data?.portions]);

    const scaledIngredients = data.ingredients.map((ingredient) => {
        if (ingredient.count) {
            const basePortions = data.portions;
            const scaledCount = (parseFloat(ingredient.count.toString()) * servings) / basePortions;

            return {
                ...ingredient,
                count: Number.isNaN(scaledCount) ? ingredient.count : scaledCount.toFixed(1),
            };
        }
        return ingredient;
    });

    return (
        <Flex mt='40px' direction='column' align='center'>
            <Flex
                justify='space-between'
                align='center'
                w={{ lg: '668px', md: '578px', sm: '604px', base: '328px' }}
                h='56px'
            >
                <Text
                    fontWeight='700'
                    fontSize='12px'
                    lineHeight='133%'
                    letterSpacing='0.05em'
                    color='#2db100'
                    ml={{ sm: '24px', base: '8px' }}
                >
                    ИНГРЕДИЕНТЫ
                </Text>
                <Flex align='center' gap={{ sm: '16px', base: '12px' }}>
                    <Text
                        fontWeight='700'
                        fontSize='12px'
                        lineHeight='133%'
                        letterSpacing='0.05em'
                        color='#2db100'
                    >
                        ПОРЦИЙ
                    </Text>
                    <NumberInput
                        w={{ sm: '90px', base: '73px' }}
                        min={1}
                        value={servings}
                        onChange={handleChange}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper data-test-id='increment-stepper' />
                            <NumberDecrementStepper data-test-id='decrement-stepper' />
                        </NumberInputStepper>
                    </NumberInput>
                </Flex>
            </Flex>
            <Flex direction='column' w={{ lg: '668px', md: '578px', sm: '604px', base: '328px' }}>
                {scaledIngredients.map((item, i) => (
                    <Flex
                        data-test-id={`ingredient-quantity-${i}`}
                        justify='space-between'
                        key={item.title}
                        h='52px'
                        align='center'
                        bgColor={i % 2 === 0 ? 'rgba(0, 0, 0, 0.06)' : ''}
                    >
                        <Text
                            fontWeight='500'
                            fontSize='14px'
                            lineHeight='143%'
                            color='rgba(0, 0, 0, 0.92)'
                            ml={{ sm: '24px', base: '8px' }}
                        >
                            {item.title}
                        </Text>
                        <Flex mr={{ sm: '24px', base: '8px' }}>
                            <Text
                                fontWeight='400'
                                fontSize='14px'
                                lineHeight='143%'
                                color='rgba(0, 0, 0, 0.92)'
                            >
                                {Number(item.count) % 1 === 0 ? Number(item.count) : item.count}{' '}
                                {item.measureUnit}
                            </Text>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};
