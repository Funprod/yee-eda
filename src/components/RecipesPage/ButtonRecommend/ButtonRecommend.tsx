import { Button, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';

import fingerUp from '~/assets/fingerUp.svg';
import fingerUpBlack from '~/assets/fingerUpBlack.svg';
import { useRecommendRecipeMutation } from '~/query/services/recipe-api/recipe-api';
import { getUserIdFromToken } from '~/utils/getUserIdFromToken';

type ButtonRecommendProps = {
    id: string;
    recommendedByUserId: string[];
};

export const ButtonRecommend = ({ id, recommendedByUserId }: ButtonRecommendProps) => {
    const [recipeRecommend] = useRecommendRecipeMutation();
    const currentUserId = getUserIdFromToken();
    const isAlreadyRecommended = recommendedByUserId && recommendedByUserId.includes(currentUserId);
    const [isRecommended, setIsRecommended] = useState(isAlreadyRecommended);

    const handleClick = async () => {
        const res = await recipeRecommend(id);
        if (res) {
            setIsRecommended(!isRecommended);
        }
    };

    const text = isRecommended ? 'Вы порекомендовали' : 'Рекомендовать рецепт';

    return (
        <Flex justify='center' mt={{ md: '40px', base: '34px' }}>
            <Button
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius='6px'
                w={{ lg: '666px', md: '578px', sm: '604px', base: '328px' }}
                h='48px'
                bg={isRecommended ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.92)'}
                leftIcon={
                    <Image
                        src={isRecommended ? fingerUpBlack : fingerUp}
                        w='14px'
                        h='14px'
                        fill=''
                    />
                }
                fontWeight='600'
                fontSize='18px'
                lineHeight='156%'
                color={isRecommended ? 'rgba(0, 0, 0, 0.8)' : '#fff'}
                onClick={handleClick}
            >
                {text}
            </Button>
        </Flex>
    );
};
