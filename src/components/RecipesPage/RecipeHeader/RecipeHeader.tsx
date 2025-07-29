import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

import bookmarkHeart from '~/assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from '~/assets/actionBar/EmojiHeartEyes.svg';
import time from '~/assets/time.svg';
import { ROUTES } from '~/constants/routes';
import { RecipeData } from '~/query/services/recipe-api/recipe-api.type';
import { categoriesSelector } from '~/store/app-slice';
import { useCategoriesWithSubcategories } from '~/utils/getCategoriesWithSubcategories';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';
import { getUserIdFromToken } from '~/utils/getUserIdFromToken';

import { DeleteButton } from './DeleteButton/DeleteButton';
import { EditRecipeButton } from './EditRecipeButton/EditRecipeButton';
import { LikeButton } from './LikeButton/LikeButton';
import { SaveButton } from './SaveButton/SaveButton';

type RecipeHeaderProps = {
    data: RecipeData;
};

export const RecipeHeader = ({ data }: RecipeHeaderProps) => {
    const categoryDataRedux = useSelector(categoriesSelector);
    const categoryFilter = useCategoriesWithSubcategories(categoryDataRedux);
    const userId = getUserIdFromToken();
    return (
        <Flex w='100%' direction={{ sm: 'row', base: 'column' }}>
            <Image
                src={data ? getFullMediaUrl(data.image) : ''}
                alt={data.title}
                w={{ lg: '553px', md: '353px', sm: '232px', base: '328px' }}
                h={{ md: '410px', base: '224px' }}
                objectFit='cover'
                borderRadius='8px'
            />

            <Flex
                direction='column'
                ml={{ md: '24px', sm: '16px', base: '0' }}
                w={{ md: '100%', sm: '480px', base: '328px' }}
                mt={{ sm: '0', base: '16px' }}
            >
                <Flex justify='space-between'>
                    <Flex
                        gap={{ md: '10px', base: '8px' }}
                        wrap='wrap'
                        w={{ lg: '100%', md: '376px' }}
                        position='relative'
                    >
                        {data?.categoriesIds?.map((id) => {
                            const filterId = categoryFilter?.filter((item) => item._id === id);
                            return filterId?.map((item) => (
                                <Link to={ROUTES.HOME} key={item._id}>
                                    <Flex
                                        w='100%'
                                        h='24px'
                                        p={{
                                            md: '2px 8px',
                                            base: '2px 4px',
                                        }}
                                        borderRadius='4px'
                                        background='var(--lime-150)'
                                        gap={{ md: '8px', base: '2px' }}
                                    >
                                        <Image src={item.icon} />
                                        <Text
                                            fontFamily='var(--font-family)'
                                            fontWeight='400'
                                            fontSize='14px'
                                            lineHeight='143%'
                                            whiteSpace='nowrap'
                                        >
                                            {item?.title}
                                        </Text>
                                    </Flex>
                                </Link>
                            ));
                        })}
                    </Flex>
                    <Flex gap='8px' align='flex-start'>
                        <Flex align='center' justify='center' gap='7px' p='0 4px'>
                            <Box w='12px' h='12px'>
                                <Image src={bookmarkHeart} />
                            </Box>
                            <Text
                                fontFamily='var(--font-family)'
                                fontWeight='600'
                                fontSize='12px'
                                lineHeight='133%'
                                color='var(--lime-600)'
                            >
                                {data?.bookmarks}
                            </Text>
                        </Flex>
                        <Flex align='center' justify='center' gap='7px' p='0 4px'>
                            <Box w='12px' h='12px'>
                                <Image src={emojiHeartEyes} />
                            </Box>
                            <Text
                                fontFamily='var(--font-family)'
                                fontWeight='600'
                                fontSize='12px'
                                lineHeight='133%'
                                color='var(--lime-600)'
                            >
                                {data.likes}
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex
                    direction='column'
                    gap={{ md: '24px', base: '16px' }}
                    mt='32px'
                    w={{ md: '528px', base: '100%' }}
                >
                    <Text
                        fontWeight='700'
                        fontSize={{ md: '48px', base: '24px' }}
                        lineHeight='100%'
                    >
                        {data.title}
                    </Text>
                    <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                        {data.description}
                    </Text>
                </Flex>
                <Flex
                    align={{ sm: 'flex-end', base: 'flex-start' }}
                    gap={{ sm: '0', base: '12px' }}
                    justify='space-between'
                    mt={{ sm: 'auto', base: '24px' }}
                    direction={{ sm: 'row', base: 'column' }}
                >
                    <Flex
                        w='104px'
                        h='24px'
                        align='center'
                        justify='center'
                        bg=' rgba(0, 0, 0, 0.06)'
                        borderRadius='4px'
                        gap='8px'
                    >
                        <Image src={time} w='16px' h='16px' />
                        <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                            {data?.time}
                        </Text>
                    </Flex>
                    <Flex gap={{ lg: '16px', base: '12px' }} align='center' justify='center'>
                        {userId === data?.authorId ? (
                            <>
                                <DeleteButton id={data._id} />
                                <EditRecipeButton />
                            </>
                        ) : (
                            <>
                                <LikeButton id={data._id} />
                                <SaveButton id={data._id} />
                            </>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
