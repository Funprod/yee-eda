import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { useGetBloggersQuery } from '~/query/services/bloggers-api/bloggers-api';
import { getUserIdFromToken } from '~/utils/getUserIdFromToken';

import { NewRecipesSection } from '../Main/NewRecipesSection/NewRecipesSection';
import { Bloggers } from './Bloggers/Bloggers';
import { Favorites } from './Favorites/Favorites';
export const DEFAULT_LIMIT = 9;
export const Blogs = () => {
    const navigate = useNavigate();
    const userId = getUserIdFromToken();
    const [limit, setLimit] = useState<number | 'all'>(DEFAULT_LIMIT);
    const { data, isError } = useGetBloggersQuery({
        currentUserId: userId,
        limit: String(limit),
    });

    useEffect(() => {
        if (isError) {
            navigate(ROUTES.HOME);
        }
    }, [isError, navigate]);

    if (!data || !data.others) return null;

    return (
        <Flex w='100%' direction='column'>
            <Text
                fontWeight='700'
                fontSize={{ md: '48px', base: '24px' }}
                lineHeight='100%'
                color='#000'
                textAlign='center'
                mt='32px'
            >
                Кулинарные блоги
            </Text>
            <Favorites bloggers={data.favorites} />
            <Bloggers
                bloggers={data.others}
                fromUserId={userId}
                limit={limit}
                setLimit={setLimit}
            />
            <NewRecipesSection />
        </Flex>
    );
};
