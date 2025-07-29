import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import arrowRight from '~/assets/main/icon/arrowRight.svg';
import { ROUTES } from '~/constants/routes';
import { useGetBloggersQuery } from '~/query/services/bloggers-api/bloggers-api';
import { getUserIdFromToken } from '~/utils/getUserIdFromToken';

import { BloggersCards } from '../../BloggersCards/BloggersCards';

export const OtherBloggers = () => {
    const userId = getUserIdFromToken();

    const { data } = useGetBloggersQuery({ currentUserId: userId, limit: '' });

    const navigate = useNavigate();

    if (!data?.others) return null;

    return (
        <Flex w='100%' mt={{ md: '64px', base: '32px' }} direction='column' gap='24px'>
            <Flex w='100%' align='center' justify='space-between'>
                <Text fontWeight='500' fontSize={{ md: '48px', base: '24px' }} lineHeight='100%'>
                    Другие блоги
                </Text>
                <Button
                    data-test-id='blogger-user-other-blogs-button'
                    borderRadius='6px'
                    bg='transparent'
                    w={{ md: '176px', base: '104px' }}
                    h={{ md: '48px', base: '24px' }}
                    rightIcon={<Image src={arrowRight} w='16px' h='16px' />}
                    fontWeight='600'
                    fontSize={{ md: '18px', base: '12px' }}
                    lineHeight='156%'
                    onClick={() => navigate(ROUTES.BLOGS)}
                >
                    Всe авторы
                </Button>
            </Flex>
            <Flex wrap='wrap' gap={{ md: '16px', base: '12px' }} justify='center'>
                {data.others.map((blogger) => (
                    <BloggersCards
                        key={blogger._id}
                        blogger={blogger}
                        fromUserId={userId}
                        isOtherBlock
                    />
                ))}
            </Flex>
        </Flex>
    );
};
