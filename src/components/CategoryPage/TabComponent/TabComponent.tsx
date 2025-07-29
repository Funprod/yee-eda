import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '~/constants/routes';
import { Category } from '~/query/services/category-api/category-api.type';
import {
    useBookmarkRecipeMutation,
    useGetRecipesCategoryQuery,
} from '~/query/services/recipe-api/recipe-api';
import { setAppLoader } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { checkAndNavigate } from '~/utils/checkAndNavigate';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';
import { highlightText } from '~/utils/highlightText';

import bookmarkHeart from './../../../assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from './../../../assets/actionBar/EmojiHeartEyes.svg';
import { CategoryTags } from './CategoryTags/CategoryTags';

type TabComponentProps = {
    searchQuery?: string;
    categoriesId?: string;
    categoryData?: Category[];
};

export const TabComponent = ({
    searchQuery = '',
    categoriesId,
    categoryData,
}: TabComponentProps) => {
    const navigate = useNavigate();
    const { data, isLoading } = useGetRecipesCategoryQuery({
        id: categoriesId!,
    });

    const dispatch = useAppDispatch();
    const [bookmarkRecipe] = useBookmarkRecipeMutation();

    useEffect(() => {
        dispatch(setAppLoader(isLoading));
    }, [dispatch, isLoading]);

    const handleGetRecipe = (recipeId: string, categoriesIds: string[]) => {
        if (!categoryData) return;
        const { condition, matchedCategory, matchedSubcategory } = checkAndNavigate({
            categoriesIds,
            categoryData: categoryData,
        });
        if (condition) {
            navigate(ROUTES.NOT_FOUND);
            return;
        }
        navigate(`/${matchedCategory?.category}/${matchedSubcategory?.category}/${recipeId}`);
    };

    const handleBookmark = (id: string) => {
        bookmarkRecipe({ id });
    };

    if (!data?.data) return null;

    return (
        <Flex direction='column' align='center' gap='16px' mt='22px'>
            <Flex wrap='wrap' gap={{ md: '24px', base: '16px' }} minH='500px' w='100%'>
                {data.data.map((card, i) => (
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
            <Button
                data-test-id='juiciest-link-mobile'
                borderRadius='6px'
                padding='0 24px'
                maxW={{ lg: '197px', base: '167px' }}
                maxH={{ lg: '48px', base: '40px' }}
                background=' #b1ff2e'
                _hover={{
                    background: 'rgba(177, 255, 46, 0.6)',
                    border: '1px solid #b1ff2e',
                }}
            >
                <Text fontWeight='600' fontSize={{ lg: '18x', base: '16px' }} lineHeight='150%'>
                    Загрузить еще
                </Text>
            </Button>
        </Flex>
    );
};
