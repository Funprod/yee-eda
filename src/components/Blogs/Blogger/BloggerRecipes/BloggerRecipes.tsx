import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import BookmarkHeart from '~/assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from '~/assets/actionBar/EmojiHeartEyes.svg';
import { CategoryTags } from '~/components/CategoryPage/TabComponent/CategoryTags/CategoryTags';
import { ROUTES } from '~/constants/routes';
import { GetRecipeByUserId } from '~/query/services/recipe-api/recipe-api.type';
import { categoriesSelector } from '~/store/app-slice';
import { checkAndNavigate } from '~/utils/checkAndNavigate';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

type BloggerRecipesProps = {
    data?: GetRecipeByUserId;
};

const MAX_VISIBLE_RECIPES = 8;

export const BloggerRecipes = ({ data }: BloggerRecipesProps) => {
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();
    const categoryData = useSelector(categoriesSelector);
    const handleGetRecipe = (recipeId: string, categoriesIds: string[]) => {
        const { condition, matchedCategory, matchedSubcategory } = checkAndNavigate({
            categoriesIds,
            categoryData,
        });
        if (condition) {
            navigate(ROUTES.NOT_FOUND);
            return;
        }
        navigate(`/${matchedCategory?.category}/${matchedSubcategory?.category}/${recipeId}`);
    };

    if (!data) return null;

    const recipes = data.recipes.slice(0, showAll ? data.recipes.length : MAX_VISIBLE_RECIPES);

    return (
        <Flex mt='32px' direction='column'>
            <Flex data-test-id='recipe-card-list' wrap='wrap' gap={{ md: '24px', base: '16px' }}>
                {recipes.map((card, i) => (
                    <Flex
                        data-test-id={`food-card-${i}`}
                        position='relative'
                        key={card._id}
                        borderRadius='8px'
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        maxWidth=''
                        maxW={{
                            lg: '668px',
                            md: '880px',
                            sm: 'calc(50% - 12px)',
                            base: '328px',
                        }}
                        w='100%'
                        h={{ lg: '324px', md: '400px', base: '128px' }}
                    >
                        <Flex flex='1'>
                            <Image
                                src={getFullMediaUrl(card.image)}
                                w={{ lg: '346px', md: '430px', base: '158px' }}
                                borderRadius='4px 0 0 4px'
                            />
                        </Flex>
                        <Flex
                            flex='1'
                            p={{ md: '20px 24px', base: '8px 0px 4px 8px' }}
                            direction='column'
                            gap={{ md: '24px', base: '0' }}
                            maxW={{ base: '154px', sm: '182px', md: '430px' }}
                            w='100%'
                        >
                            <Flex justify={{ md: 'space-between', base: 'flex-start' }}>
                                <CategoryTags tagsId={card.categoriesIds} />
                                <Flex
                                    gap='8px'
                                    ml={{ md: '28px', base: '0' }}
                                    mr={{ base: '85px', md: '0' }}
                                >
                                    <Flex gap='8px' align='flex-start'>
                                        <Flex align='center' justify='center' gap='7px' p='0 4px'>
                                            <Box w='12px' h='12px'>
                                                <Image src={BookmarkHeart} />
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
                                                {card.likes}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex
                                flex='1'
                                w={{ lg: '274px', base: '100%' }}
                                h='100px'
                                direction='column'
                            >
                                <Text
                                    fontFamily='var(--font-family)'
                                    fontWeight='500'
                                    fontSize={{ md: '20px', base: '16px' }}
                                    lineHeight='140%'
                                    noOfLines={{ lg: 1, base: 2 }}
                                    overflow='hidden'
                                    textOverflow='ellipsis'
                                >
                                    {card.title}
                                </Text>
                                <Flex
                                    flex='1'
                                    display={{ base: 'none', md: 'flex' }}
                                    direction='column'
                                >
                                    <Text
                                        mt='8px'
                                        fontFamily='var(--font-family)'
                                        fontWeight='400'
                                        fontSize='14px'
                                        lineHeight='143%'
                                        noOfLines={{ lg: 3, base: 4 }}
                                        overflow='hidden'
                                        textOverflow='ellipsis'
                                    >
                                        {card.description}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex
                                justify='flex-end'
                                gap='8px'
                                mt='auto'
                                mr={{ base: '4px', md: '0' }}
                            >
                                <Button
                                    border='1px solid rgba(0, 0, 0, 0.48)'
                                    borderRadius='6px'
                                    p={{ md: '0 12px', base: '0' }}
                                    w={{ md: '122px', base: '24px' }}
                                    minW='0'
                                    h={{ md: '32px', base: '24px' }}
                                    backgroundColor='rgba(255, 255, 255, 0.06)'
                                    _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}
                                >
                                    <Image
                                        src={BookmarkHeart}
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
                    </Flex>
                ))}
            </Flex>
            <Flex w='100%' justify='center' mt='24px'>
                {!showAll && data.recipes.length > MAX_VISIBLE_RECIPES && (
                    <Button
                        data-test-id='load-more-button'
                        borderRadius='6px'
                        padding='0 24px'
                        maxW={{ lg: '197px', base: '167px' }}
                        w='100%'
                        h={{ lg: '48px', base: '40px' }}
                        maxH='100%'
                        background='#b1ff2e'
                        _hover={{
                            background: 'rgba(177, 255, 46, 0.6)',
                            border: '1px solid #b1ff2e',
                        }}
                        onClick={() => setShowAll(true)}
                    >
                        <Text
                            fontWeight='600'
                            fontSize={{ lg: '18px', base: '16px' }}
                            lineHeight='150%'
                        >
                            Загрузить еще
                        </Text>
                    </Button>
                )}
            </Flex>
        </Flex>
    );
};
