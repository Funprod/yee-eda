import { Button, Image, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import bookmarkHeart from '~/assets/actionBar/BookmarkHeart.svg';
import { useBookmarkRecipeMutation } from '~/query/services/recipe-api/recipe-api';
import { setAppError } from '~/store/app-slice';

type SaveButtonProps = {
    id: string;
};

export const SaveButton = ({ id }: SaveButtonProps) => {
    const [bookmarkRecipe, { error }] = useBookmarkRecipeMutation();
    const dispatch = useDispatch();
    const handleOnClick = () => {
        bookmarkRecipe({ id });
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
            w={{ lg: '273px', md: '202px', base: '168px' }}
            h={{ lg: '48px', md: '32px', base: '24px' }}
            borderRadius='6px'
            bg='#b1ff2e'
            onClick={handleOnClick}
        >
            <Image src={bookmarkHeart} mr='8px' />
            <Text
                fontWeight='600'
                fontSize={{ lg: '18px', md: '14px', base: '12px' }}
                lineHeight='156%'
                color=' rgba(0, 0, 0, 0.8)'
            >
                Сохранить в закладки
            </Text>
        </Button>
    );
};
