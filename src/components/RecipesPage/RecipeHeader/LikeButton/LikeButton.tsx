import { Button, Image, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import emojiHeartEyes from '~/assets/actionBar/EmojiHeartEyes.svg';
import { useLikeRecipeMutation } from '~/query/services/recipe-api/recipe-api';
import { setAppError } from '~/store/app-slice';

type LikeButtonProps = {
    id: string;
};

export const LikeButton = ({ id }: LikeButtonProps) => {
    const [likeRecipe, { error }] = useLikeRecipeMutation();
    const dispatch = useDispatch();
    const handleOnClick = () => {
        likeRecipe(id);
    };

    useEffect(() => {
        if (error) {
            dispatch(
                setAppError({
                    title: 'Ошибка сервера',
                    message: 'Попробуйте немного позже',
                }),
            );
        }
    }, [dispatch, error]);

    return (
        <Button
            w={{ lg: '219px', md: '160px', base: '132px' }}
            h={{ lg: '48px', md: '32px', base: '24px' }}
            borderRadius='6px'
            border='1px solid rgba(0, 0, 0, 0.48)'
            bg='rgba(255, 255, 255, 0.06)'
            onClick={handleOnClick}
        >
            <Image src={emojiHeartEyes} mr='8px' />
            <Text
                fontWeight='600'
                fontSize={{ lg: '18px', md: '14px', base: '12px' }}
                lineHeight='156%'
                color=' rgba(0, 0, 0, 0.8)'
            >
                Оценить рецепт
            </Text>
        </Button>
    );
};
