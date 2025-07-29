import { Flex, Text } from '@chakra-ui/react';

import { RecipeData } from '~/query/services/recipe-api/recipe-api.type';

type CalorieInfoProps = {
    data: RecipeData;
};

export const CalorieInfo = ({ data }: CalorieInfoProps) => (
    <Flex direction='column' align='center' mt='40px'>
        <Flex direction='column' align='flex-start'>
            <Text fontWeight='400' fontSize='14px' lineHeight='143%' color='rgba(0, 0, 0, 0.8)'>
                * Калорийность на 1 порцию
            </Text>

            <Flex
                gap={{ lg: '24px', base: '12px' }}
                mt='20px'
                direction={{ sm: 'row', base: 'column' }}
            >
                <Flex
                    direction={{ sm: 'column', base: 'row' }}
                    gap='12px'
                    border=' 1px solid rgba(0, 0, 0, 0.08)'
                    borderRadius='16px'
                    align='center'
                    justify={{ sm: 'center', base: 'flex-start' }}
                    p={{ base: '0 12px', sm: '0' }}
                    w={{ lg: '149px', md: '135px', sm: '173px', base: '328px' }}
                    h={{ sm: '136px', base: '64px' }}
                >
                    <Text
                        fontWeight='400'
                        fontSize='14px'
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.48)'
                        textAlign={{ base: 'start', sm: 'center' }}
                        w={{ base: '117px', sm: '100%' }}
                    >
                        калорийность
                    </Text>
                    <Text
                        fontWeight='500'
                        fontSize={{ sm: '36px', base: '24px' }}
                        lineHeight='111%'
                        color='#134b00'
                        textAlign='center'
                        w={{ base: '117px', sm: '100%' }}
                    >
                        {data.nutritionValue.calories}
                    </Text>
                    <Text
                        fontWeight='600'
                        fontSize={{ sm: '14px', base: '12px' }}
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.8)'
                    >
                        ККАЛ
                    </Text>
                </Flex>
                <Flex
                    direction={{ sm: 'column', base: 'row' }}
                    gap='12px'
                    border=' 1px solid rgba(0, 0, 0, 0.08)'
                    borderRadius='16px'
                    align='center'
                    justify={{ sm: 'center', base: 'flex-start' }}
                    p={{ base: '0 12px', sm: '0' }}
                    w={{ lg: '149px', md: '135px', sm: '173px', base: '328px' }}
                    h={{ sm: '136px', base: '64px' }}
                >
                    <Text
                        fontWeight='400'
                        fontSize='14px'
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.48)'
                        textAlign={{ base: 'start', sm: 'center' }}
                        w={{ base: '117px', sm: '100%' }}
                    >
                        белки
                    </Text>
                    <Text
                        fontWeight='500'
                        fontSize={{ sm: '36px', base: '24px' }}
                        lineHeight='111%'
                        color='#134b00'
                        textAlign='center'
                        w={{ base: '117px', sm: '100%' }}
                    >
                        {data.nutritionValue.proteins || data.nutritionValue.protein}
                    </Text>
                    <Text
                        fontWeight='600'
                        fontSize={{ sm: '14px', base: '12px' }}
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.8)'
                    >
                        ГРАММ
                    </Text>
                </Flex>
                <Flex
                    direction={{ sm: 'column', base: 'row' }}
                    gap='12px'
                    border=' 1px solid rgba(0, 0, 0, 0.08)'
                    borderRadius='16px'
                    align='center'
                    justify={{ sm: 'center', base: 'flex-start' }}
                    p={{ base: '0 12px', sm: '0' }}
                    w={{ lg: '149px', md: '135px', sm: '173px', base: '328px' }}
                    h={{ sm: '136px', base: '64px' }}
                >
                    <Text
                        fontWeight='400'
                        fontSize='14px'
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.48)'
                        textAlign={{ base: 'start', sm: 'center' }}
                        w={{ base: '117px', sm: '100%' }}
                    >
                        жиры
                    </Text>
                    <Text
                        fontWeight='500'
                        fontSize={{ sm: '36px', base: '24px' }}
                        lineHeight='111%'
                        color='#134b00'
                        textAlign='center'
                        w={{ base: '117px', sm: '100%' }}
                    >
                        {data.nutritionValue.fats}
                    </Text>
                    <Text
                        fontWeight='600'
                        fontSize={{ sm: '14px', base: '12px' }}
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.8)'
                    >
                        ГРАММ
                    </Text>
                </Flex>
                <Flex
                    direction={{ sm: 'column', base: 'row' }}
                    gap='12px'
                    border=' 1px solid rgba(0, 0, 0, 0.08)'
                    borderRadius='16px'
                    align='center'
                    justify={{ sm: 'center', base: 'flex-start' }}
                    p={{ base: '0 12px', sm: '0' }}
                    w={{ lg: '149px', md: '135px', sm: '173px', base: '328px' }}
                    h={{ sm: '136px', base: '64px' }}
                >
                    <Text
                        fontWeight='400'
                        fontSize='14px'
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.48)'
                        textAlign={{ base: 'start', sm: 'center' }}
                        w={{ base: '117px', sm: '100%' }}
                    >
                        углеводы
                    </Text>
                    <Text
                        fontWeight='500'
                        fontSize={{ sm: '36px', base: '24px' }}
                        lineHeight='111%'
                        color='#134b00'
                        textAlign='center'
                        w={{ base: '117px', sm: '100%' }}
                    >
                        {data.nutritionValue.carbohydrates}
                    </Text>
                    <Text
                        fontWeight='600'
                        fontSize={{ sm: '14px', base: '12px' }}
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.8)'
                    >
                        ГРАММ
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    </Flex>
);
