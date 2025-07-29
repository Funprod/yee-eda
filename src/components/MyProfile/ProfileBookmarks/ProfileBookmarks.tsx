import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import BookmarkHeart from '~/assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from '~/assets/actionBar/EmojiHeartEyes.svg';
import deleteBookmarks from '~/assets/deleteBookmarks.svg';
import noImage from '~/assets/noImage.jpg';
import { CategoryTags } from '~/components/CategoryPage/TabComponent/CategoryTags/CategoryTags';
import { useBookmarkRecipeMutation } from '~/query/services/recipe-api/recipe-api';
import { GetRecipeByUserId } from '~/query/services/recipe-api/recipe-api.type';
import { setAppSuccess } from '~/store/app-slice';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';
import { getUserIdFromToken } from '~/utils/getUserIdFromToken';

type ProfileBookmarksProps = {
    recipesData: GetRecipeByUserId;
};

const MAX_VISIBLE_RECIPES = 8;

export const ProfileBookmarks = ({ recipesData }: ProfileBookmarksProps) => {
    const [showAll, setShowAll] = useState(false);
    const [deleteBookmark] = useBookmarkRecipeMutation();
    const [bookmarks, setBookmarks] = useState(recipesData?.myBookmarks);
    const userId = getUserIdFromToken();

    const dispatch = useDispatch();

    const handleDeleteBookmark = async (id: string) => {
        await deleteBookmark({ id, userId });
        dispatch(setAppSuccess({ title: '', message: 'Закладка удалена' }));
        setBookmarks(bookmarks?.filter((bookmark) => bookmark._id !== id));
    };

    const bookmarksRecipes = bookmarks.slice(0, showAll ? bookmarks.length : MAX_VISIBLE_RECIPES);

    useEffect(() => {
        setBookmarks(recipesData?.myBookmarks);
    }, [recipesData]);

    return (
        <Flex
            data-test-id='user-profile-bookmarks'
            w='100%'
            direction='column'
            gap='16px'
            mt={{ md: '40px', base: '32px' }}
        >
            <Flex gap='32px'>
                <Flex gap='8px'>
                    <Text fontWeight='700' fontSize='20px' lineHeight='140%'>
                        Мои закладки
                    </Text>
                    <Text
                        fontWeight='400'
                        fontSize='20px'
                        lineHeight='140%'
                        color='rgba(0, 0, 0, 0.48)'
                    >
                        ({recipesData.myBookmarks.length})
                    </Text>
                </Flex>
            </Flex>
            <Flex wrap='wrap' gap='16px'>
                {bookmarksRecipes.map((recipe, index) => {
                    const recipeImg = recipe.image ? getFullMediaUrl(recipe.image) : noImage;
                    return (
                        <Flex
                            data-test-id={`food-card-${index}`}
                            position='relative'
                            key={recipe._id}
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
                            h={{ md: '264px', base: '128px' }}
                        >
                            <Image
                                src={recipeImg}
                                minW={{ md: '346px', base: '158px' }}
                                w='100%'
                                borderRadius='4px 0 0 4px'
                            />
                            <Flex
                                p={{ md: '20px 24px', base: '8px 0px 4px 8px' }}
                                direction='column'
                                gap={{ md: '24px', base: '0' }}
                                maxW={{ sm: '100%', base: '162px' }}
                                w='100%'
                            >
                                <Flex justify={{ md: 'space-between', base: 'flex-start' }}>
                                    <CategoryTags tagsId={recipe.categoriesIds} />
                                    <Flex
                                        gap='8px'
                                        ml={{ md: '28px', base: '0' }}
                                        mr={{ base: '85px', md: '0' }}
                                    >
                                        <Flex gap='8px' align='flex-start'>
                                            <Flex
                                                align='center'
                                                justify='center'
                                                gap='7px'
                                                p='0 4px'
                                            >
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
                                                    {recipe.bookmarks}
                                                </Text>
                                            </Flex>
                                            <Flex
                                                align='center'
                                                justify='center'
                                                gap='7px'
                                                p='0 4px'
                                            >
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
                                                    {recipe.likes}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex
                                    flex='1'
                                    w={{ lg: '274px', base: '100%' }}
                                    maxH='100px'
                                    maxW={{ md: '484px', base: '180px' }}
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
                                        {recipe.title}
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
                                            noOfLines={3}
                                            overflow='hidden'
                                            textOverflow='ellipsis'
                                        >
                                            {recipe.description}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex
                                    justify={{ md: 'flex-end', base: 'center' }}
                                    gap='8px'
                                    mt='auto'
                                >
                                    <Button
                                        w={{ md: '212px', base: '158px' }}
                                        h={{ md: '32px', base: '24px' }}
                                        borderRadius='6px'
                                        border='1px solid rgba(0, 0, 0, 0.48)'
                                        bg='rgba(255, 255, 255, 0.06)'
                                        onClick={() => handleDeleteBookmark(recipe._id)}
                                    >
                                        <Image
                                            src={deleteBookmarks}
                                            w='12px'
                                            h='14px'
                                            display={{ base: 'none', md: 'block' }}
                                            mr={{ md: '8px', base: '0' }}
                                        />
                                        <Text
                                            fontWeight='600'
                                            fontSize={{ lg: '14px', base: '12px' }}
                                            lineHeight='143%'
                                            color=' rgba(0, 0, 0, 0.8)'
                                        >
                                            Убрать из сохранённых
                                        </Text>
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    );
                })}
            </Flex>
            {!showAll && recipesData.myBookmarks.length > MAX_VISIBLE_RECIPES && (
                <Flex w='100%' justify='center' mt='24px'>
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
                </Flex>
            )}
        </Flex>
    );
};
