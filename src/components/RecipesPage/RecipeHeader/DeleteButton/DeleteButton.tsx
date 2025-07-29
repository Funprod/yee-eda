import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { useDeleteRecipeMutation } from '~/query/services/recipe-api/recipe-api';
import { setRecipeId } from '~/store/app-slice';

type DeleteButtonProps = {
    id: string;
};

export const DeleteButton = ({ id }: DeleteButtonProps) => {
    const [deleteRecipe, { isSuccess }] = useDeleteRecipeMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = async () => {
        dispatch(setRecipeId(id));
        await deleteRecipe(id);
    };

    useEffect(() => {
        if (isSuccess) {
            navigate(ROUTES.HOME);
        }
    }, [isSuccess, navigate]);
    return (
        <>
            <IconButton
                data-test-id='recipe-delete-button'
                icon={<DeleteIcon w='12px' h='14px' />}
                aria-label='Удалить ингредиент'
                onClick={handleClick}
                minW='0px'
                w='32px'
                h='32px'
                p='0'
                bg='transparent'
            />
        </>
    );
};
