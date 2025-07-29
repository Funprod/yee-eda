import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { Category } from '~/query/services/category-api/category-api.type';
import {
    useBookmarkRecipeMutation,
    useGetRecipesQuery,
} from '~/query/services/recipe-api/recipe-api';
import { checkAndNavigate } from '~/utils/checkAndNavigate';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';
import { highlightText } from '~/utils/highlightText';

import { CategoryTags } from '../CategoryPage/TabComponent/CategoryTags/CategoryTags';
import bookmarkHeart from './../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../assets/actionBar/EmojiHeartEyes.svg';

type SearchFilterProps = {
    categoryData: Category[];
    searchQuery: string;
    categoriesIds: string[];
    allergens: string[];
    meat: string[];
    garnish: string[];
    onLoadingChange: (val: boolean) => void;
    setSearchResultsCount: (val: number) => void;
    filteredData: Category[];
};

export const SearchFilter = ({
    filteredData,
    searchQuery,
    categoriesIds,
    allergens,
    meat,
    garnish,
    onLoadingChange,
    categoryData,
    setSearchResultsCount,
}: SearchFilterProps) => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [localCategoriesIds, setLocalCategoriesIds] = useState<string[]>([]);
    const [bookmarkRecipe] = useBookmarkRecipeMutation();
    useEffect(() => {
        if (categoriesIds.length === 0) {
            const matchedCategory = filteredData?.find((cat) => cat.category === category);

            if (matchedCategory?.subCategories?.length) {
                const subCategoryIds = matchedCategory.subCategories.map((sub) => sub._id);
                setLocalCategoriesIds(subCategoryIds);
            }
        }
    }, [categoriesIds.length, category, filteredData]);

    const { data, isError, error, isLoading } = useGetRecipesQuery({
        subcategoriesIds: categoriesIds.length ? categoriesIds : localCategoriesIds,
        ...(allergens?.length ? { allergens } : {}),
        ...(meat?.length ? { meat } : {}),
        ...(garnish?.length ? { garnish } : {}),
        searchString: searchQuery,
        limit: 20,
    });

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

    useEffect(() => {
        onLoadingChange?.(isLoading);
    }, [isLoading, onLoadingChange]);

    useEffect(() => {
        if (isError && error) {
            sessionStorage.setItem('error', 'Попробуйте немного позже');
        }
    }, [isError, error]);

    useEffect(() => {
        setSearchResultsCount(data?.data?.length ?? 0);
    }, [data?.data?.length, setSearchResultsCount]);

    const handleBookmark = (id: string) => {
        bookmarkRecipe({ id });
    };

    return (
        <Flex direction='column' align='center' gap='16px' mt='42px'>
            <Flex wrap='wrap' gap={{ md: '24px', base: '16px' }} justify='space-between'>
                {Array.isArray(data?.data) &&
                    data?.data.map((card, i) => (
                        <Flex
                            data-test-id={`food-card-${i}`}
                            position='relative'
                            key={card._id}
                            borderRadius='8px'
                            border='1px solid rgba(0, 0, 0, 0.08)'
                            maxW={{
                                lg: '668px',
                                md: '860px',
                                sm: 'calc(50% - 12px)',
                                base: '356px',
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
                                    <Flex
                                        justify={{ md: 'space-between', base: 'flex-start' }}
                                        mr='10px'
                                    >
                                        <CategoryTags tagsId={card.categoriesIds} />
                                        <Flex
                                            ml={{ md: '36px', base: '0' }}
                                            mr={{ base: '85px', md: '0' }}
                                        >
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
                                    <Box
                                        w={{ lg: '274px', base: '100%' }}
                                        textAlign='start'
                                        mt='10px'
                                    >
                                        <Text
                                            fontFamily='var(--font-family)'
                                            fontWeight='500'
                                            fontSize={{ md: '20px', base: '16px' }}
                                            lineHeight='140%'
                                            noOfLines={{ md: 1, base: 2 }}
                                            overflow='hidden'
                                            textOverflow='ellipsis'
                                            dangerouslySetInnerHTML={{
                                                __html: highlightText(card.title, searchQuery),
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
                                        data-test-id={`card-link-${i}`}
                                        border='1px solid rgba(0, 0, 0, 0.08)'
                                        borderRadius='6px'
                                        p={{ md: '0 12px', base: '0 6px' }}
                                        w='87px'
                                        h={{ md: '32px', base: '24px' }}
                                        backgroundColor='rgba(0, 0, 0, 0.92)'
                                        _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.52)' }}
                                        onClick={() =>
                                            handleGetRecipe(card._id, card.categoriesIds)
                                        }
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
        </Flex>
    );
};
