import { Avatar, Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import bookmarkHeart from '~/assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from '~/assets/actionBar/EmojiHeartEyes.svg';
import { useBookmarkRecipeMutation } from '~/query/services/recipe-api/recipe-api';
import { RecipesWithRecommendation } from '~/query/services/statistics-api/statistics-api.type';
import { GetAllUsersResponse } from '~/query/services/users-api/users-api.type';
import { checkAndNavigate } from '~/utils/checkAndNavigate';
import { useCategoryData } from '~/utils/getCategories';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';
import { getUserIdFromToken } from '~/utils/getUserIdFromToken';

import { CategoryTags } from '../../../../CategoryPage/TabComponent/CategoryTags/CategoryTags';

type RecipeCardProps = {
    allUsersData: GetAllUsersResponse[];
    card: RecipesWithRecommendation;
};

export const RecommendRecipeCard = ({ allUsersData, card }: RecipeCardProps) => {
    const userId = getUserIdFromToken();

    const userRecommend = allUsersData?.find(
        (user) => user.id === userId && card.recommendedByUserId.includes(userId),
    );
    const categoryData = useCategoryData();

    const navigate = useNavigate();

    const [bookmarkRecipe] = useBookmarkRecipeMutation();

    const handleGetRecipe = (recipeId: string, categoriesIds: string[]) => {
        const { matchedCategory, matchedSubcategory } = checkAndNavigate({
            categoriesIds,
            categoryData: categoryData,
        });
        navigate(`/${matchedCategory?.category}/${matchedSubcategory?.category}/${recipeId}`);
    };
    const handleBookmark = (id: string) => {
        bookmarkRecipe({ id });
    };
    return (
        <Flex
            position='relative'
            key={card._id}
            borderRadius='8px'
            border='1px solid rgba(0, 0, 0, 0.08)'
            maxW={{
                lg: '668px',
                md: '880px',
                sm: 'calc(50% - 12px)',
                base: '328px',
            }}
            w='100%'
            h={{ md: '264px', base: '148px' }}
        >
            <Image
                src={getFullMediaUrl(card.image)}
                minW={{ md: '346px', base: '158px' }}
                w='100%'
                borderRadius='4px 0 0 4px'
            />
            <Flex
                p={{ md: '20px 24px', base: '0' }}
                m={{ md: '0', base: '8px 8px 4px 8px' }}
                direction='column'
                gap={{ md: '24px', base: '0' }}
                w={{ base: '154px', sm: '182px', md: '100%' }}
                justify='space-between'
            >
                <Flex direction='column'>
                    <Flex justify={{ md: 'space-between', base: 'flex-start' }} mr='10px'>
                        <CategoryTags tagsId={card.categoriesIds} />
                        <Flex ml={{ md: '36px', base: '0' }} mr={{ base: '85px', md: '0' }}>
                            <Flex gap='8px' align='flex-start'>
                                <Flex gap='6px' align='center'>
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
                                        {card.bookmarks}
                                    </Text>
                                </Flex>
                                <Flex gap='6px' align='center'>
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
                                        {card.likes}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Box w={{ lg: '274px', base: '100%' }} textAlign='start' mt='10px'>
                        <Text
                            fontFamily='var(--font-family)'
                            fontWeight='500'
                            fontSize={{ md: '20px', base: '16px' }}
                            lineHeight='140%'
                            noOfLines={{ md: 1, base: 2 }}
                            overflow='hidden'
                            textOverflow='ellipsis'
                            dangerouslySetInnerHTML={{
                                __html: card.title,
                            }}
                        />
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Text
                                mt='8px'
                                fontFamily='var(--font-family)'
                                fontWeight='400'
                                fontSize='14px'
                                lineHeight='143%'
                                noOfLines={{ md: 3, base: 0 }}
                                overflow='hidden'
                                textOverflow='ellipsis'
                            >
                                {card.description}
                            </Text>
                        </Box>
                    </Box>
                </Flex>
                <Flex justify='flex-end' gap='8px' mr='10px' mb='6px'>
                    <Button
                        border='1px solid rgba(0, 0, 0, 0.48)'
                        borderRadius='6px'
                        p={{ md: '0 12px', base: '0' }}
                        w={{ md: '122px', base: '24px' }}
                        minW='0'
                        h={{ md: '32px', base: '24px' }}
                        backgroundColor='rgba(255, 255, 255, 0.06)'
                        _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}
                        onClick={() => handleBookmark(card._id)}
                    >
                        <Image
                            src={bookmarkHeart}
                            mr={{ md: '8px', base: '0' }}
                            w={{ md: '14px', base: '12px' }}
                            h={{ md: '14px', base: '12px' }}
                        />
                        <Box display={{ base: 'none', md: 'block' }}>
                            <Text
                                fontFamily='var(--font-family)'
                                fontWeight='600'
                                fontSize='14px'
                                lineHeight='143%'
                            >
                                Сохранить
                            </Text>
                        </Box>
                    </Button>
                    <Button
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        borderRadius='6px'
                        p={{ md: '0 12px', base: '0 6px' }}
                        w='87px'
                        h={{ md: '32px', base: '24px' }}
                        backgroundColor='rgba(0, 0, 0, 0.92)'
                        _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.52)' }}
                        onClick={() => handleGetRecipe(card._id, card.categoriesIds)}
                    >
                        <Text
                            fontFamily='var(--font-family)'
                            fontWeight='600'
                            fontSize='14px'
                            lineHeight='143%'
                            color='#fff'
                        >
                            Готовить
                        </Text>
                    </Button>
                </Flex>
            </Flex>
            {userRecommend && (
                <Flex
                    h='28px'
                    display={{ base: 'none', md: 'flex' }}
                    bg='#d7ff94'
                    borderRadius='4px'
                    position='absolute'
                    left='24px'
                    bottom='24px'
                    align='center'
                    p='4px 8px'
                    gap='8px'
                >
                    <Avatar src={getFullMediaUrl(userRecommend.photo)} w='16px' h='16px' />
                    <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                        {`${userRecommend.firstName} ${userRecommend.lastName} рекомендует`}
                    </Text>
                </Flex>
            )}
        </Flex>
    );
};
