import { Flex, Image, Text } from '@chakra-ui/react';

import { RecipeData } from '~/query/services/recipe-api/recipe-api.type';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

type CookingStepsProps = {
    data: RecipeData;
};

export const CookingSteps = ({ data }: CookingStepsProps) => (
    <Flex mt='40px' direction='column' align='center'>
        <Flex
            direction='column'
            align='flex-start'
            w={{ lg: '668px', md: '578px', sm: '604px', base: '328px' }}
            gap='20px'
        >
            <Text
                fontWeight='500'
                fontSize={{ md: '48px', base: '24px' }}
                lineHeight='100%'
                textAlign='start'
            >
                Шаги приготовления
            </Text>
            {data.steps.map((item) => (
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    key={item.stepNumber}
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    borderRadius='8px'
                    w={{ lg: '668px', md: '578px', sm: '604px', base: '328px' }}
                >
                    <Image
                        src={item.image ? getFullMediaUrl(item.image) : ''}
                        maxW={{ md: '300px', base: '158px' }}
                        minW={{ md: '300px', base: '158px' }}
                    />
                    <Flex direction='column' m='12px 10px' gap='12px'>
                        <Flex
                            justify='center'
                            align='center'
                            borderRadius='4px'
                            w='55px'
                            h='24px'
                            bg='rgba(0, 0, 0, 0.06)'
                        >
                            <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                                Шаг {item.stepNumber}
                            </Text>
                        </Flex>
                        <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                            {item.description}
                        </Text>
                    </Flex>
                </Flex>
            ))}
        </Flex>
    </Flex>
);
