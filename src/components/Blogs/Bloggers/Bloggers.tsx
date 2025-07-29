import { Button, Flex, Image } from '@chakra-ui/react';

import arrowRight from '~/assets/main/icon/arrowRight.svg';
import { Blogger } from '~/query/services/bloggers-api/bloggers-api.type';

import { BloggersCards } from '../BloggersCards/BloggersCards';
import { DEFAULT_LIMIT } from '../Blogs';

type BloggersProps = {
    bloggers: Blogger[];
    fromUserId: string;
    limit: number | 'all';
    setLimit: (val: number | 'all') => void;
};

export const Bloggers = ({ bloggers, fromUserId, limit, setLimit }: BloggersProps) => (
    <Flex
        data-test-id='blogs-others-box'
        w='100%'
        borderRadius='16px'
        p={{ md: '24px', base: '12px' }}
        bg='rgba(0, 0, 0, 0.04)'
        align='center'
        mt='40px'
        direction='column'
    >
        <Flex data-test-id='blogs-others-grid' wrap='wrap' gap={{ md: '16px', base: '12px' }}>
            {bloggers.map((blogger) => (
                <BloggersCards key={blogger._id} blogger={blogger} fromUserId={fromUserId} />
            ))}
        </Flex>
        {limit === 'all' ? (
            <Button
                data-test-id='blogs-others-button'
                borderRadius='6px'
                bg='transparent'
                w='176px'
                h='48px'
                mt='24px'
                leftIcon={
                    <Image
                        src={arrowRight}
                        w='16px'
                        h='16px'
                        sx={{ transform: 'rotate(180deg)' }}
                    />
                }
                fontWeight='600'
                fontSize='18px'
                lineHeight='156%'
                onClick={() => setLimit(DEFAULT_LIMIT)}
            >
                Свернуть
            </Button>
        ) : (
            <Button
                data-test-id='blogs-others-button'
                borderRadius='6px'
                bg='transparent'
                w='176px'
                h='48px'
                mt='24px'
                rightIcon={<Image src={arrowRight} w='16px' h='16px' />}
                fontWeight='600'
                fontSize='18px'
                lineHeight='156%'
                onClick={() => setLimit('all')}
            >
                Все авторы
            </Button>
        )}
    </Flex>
);
