import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

import BookmarkHeart from '~/assets/actionBar/BookmarkHeart.svg';
import emojiHeartEyes from '~/assets/actionBar/EmojiHeartEyes.svg';
import noImage from '~/assets/noImage.jpg';
import { CategoryTags } from '~/components/CategoryPage/TabComponent/CategoryTags/CategoryTags';
import { getFullMediaUrl } from '~/utils/getFullMediaUrl';

import { AllRecipes } from '../ProfileRecipes';

type RecipeCardProps = {
    recipe: AllRecipes;
    index: number;
    handleClickEditRecipe: (recipeId: string, categoriesIds: string[]) => void;
    handleClickEditDraftRecipe: (recipeId: string) => void;
};

export const ProfileRecipeCard = ({
    recipe,
    index,
    handleClickEditRecipe,
    handleClickEditDraftRecipe,
}: RecipeCardProps) => {
    const recipeImg = recipe.image ? getFullMediaUrl(recipe.image) : noImage;
    return (
        <Flex
            data-test-id={`food-card-${index}`}
            position='relative'
            key={recipe._id}
            borderRadius='8px'
            border='1px solid rgba(0, 0, 0, 0.08)'
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
                p={{ md: '20px 24px', base: '8px 4px 4px 8px' }}
                direction='column'
                gap={{ md: '24px', base: '0' }}
                maxW={{ sm: '100%', base: '162px' }}
                w='100%'
            >
                <Flex justify={{ md: 'space-between', base: 'flex-start' }}>
                    <CategoryTags tagsId={recipe.categoriesIds} />
                    {recipe.draft ? (
                        <Text
                            borderRadius='4px'
                            fontWeight='400px'
                            fontSize='14px'
                            lineHeight='143%'
                            bg='rgba(0, 0, 0, 0.06)'
                            p='2px 8px'
                            h='24px'
                        >
                            Черновик
                        </Text>
                    ) : (
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
                                        {recipe.bookmarks}
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
                                        {recipe.likes}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
                <Flex
                    w={{ lg: '274px', base: '100%' }}
                    direction='column'
                    maxH='100px'
                    maxW={{ md: '484px', base: '180px' }}
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
                    <Flex flex='1' display={{ base: 'none', md: 'flex' }} direction='column'>
                        <Text
                            mt='8px'
                            fontFamily='var(--font-family)'
                            fontWeight='400'
                            fontSize='14px'
                            lineHeight='143%'
                            noOfLines={{ md: 3, base: 4 }}
                            overflow='hidden'
                            textOverflow='ellipsis'
                        >
                            {recipe.description}
                        </Text>
                    </Flex>
                </Flex>
                <Flex justify='flex-end' gap='8px' mt='auto' mr={{ base: '4px', md: '0' }}>
                    <Button
                        data-test-id='profile-edit-button'
                        w={{ md: '132px', base: '108px' }}
                        h={{ md: '32px', base: '24px' }}
                        borderRadius='6px'
                        border='1px solid rgba(0, 0, 0, 0.48)'
                        bg={recipe.draft ? 'rgba(0, 0, 0, 0.92)' : 'rgba(255, 255, 255, 0.06)'}
                        onClick={() => {
                            recipe.draft
                                ? handleClickEditDraftRecipe(recipe._id)
                                : handleClickEditRecipe(recipe._id, recipe.categoriesIds);
                        }}
                    >
                        <Text
                            fontWeight='600'
                            fontSize={{ lg: '14px', md: '12px', base: '12px' }}
                            lineHeight='143%'
                            color={recipe.draft ? '#fff' : ' rgba(0, 0, 0, 0.8)'}
                        >
                            Редактировать
                        </Text>
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
