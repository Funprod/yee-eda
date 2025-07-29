import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useFilterCheck } from '~/hooks/useFilterCheck';
import useRecipeFilters from '~/hooks/useRecipeFilters';
import { useResetFiltersOnCategoryChange } from '~/hooks/useResetFiltersOnCategoryChange';
import { useTabIndex } from '~/hooks/useTabIndex';
import { useValidateCategory } from '~/hooks/useValidateCategory';
import { Category } from '~/query/services/category-api/category-api.type';
import { useCategoriesWithSubcategories } from '~/utils/getCategoriesWithSubcategories';

import { PageHeader } from '../PageHeader/PageHeader';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { TabComponent } from './TabComponent/TabComponent';

export const CategoryPage = () => {
    const { category, subcategory } = useParams();

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [searchResultsCount, setSearchResultsCount] = useState<number>(0);

    const categoryData = useCategoriesWithSubcategories();
    const foundCategory = categoryData?.find((cat: Category) => cat.category === category);

    useValidateCategory({ foundCategory, category, subcategory });

    const { tabIndex, setTabIndex } = useTabIndex(foundCategory?.subCategories);

    const {
        excludedIngredients,
        setExcludedIngredients,
        selectedCategory,
        setSelectedCategory,
        setSelectedMeat,
        setSelectedSide,
        selectedSide,
        selectedMeat,
        searchQuery,
        setSearchQuery,
        setCategoriesIds,
        categoriesIds,
        allergens,
        meat,
        side,
    } = useRecipeFilters();

    const isFilterApplied = useFilterCheck({
        excludedIngredients,
        searchQuery,
        selectedCategory,
        selectedMeat,
        selectedSide,
    });

    useResetFiltersOnCategoryChange({
        category,
        setExcludedIngredients,
        setSearchQuery,
        setSelectedCategory,
        setSelectedMeat,
        setSelectedSide,
    });

    const handleTabChange = (index: number) => {
        setTabIndex(index);
        const subcategorySlug = foundCategory?.subCategories[index]?.category;
        if (subcategorySlug) {
            navigate(`/${foundCategory?.category}/${subcategorySlug}`);
        }
    };

    const handleNavigate = (category: string, subcategory: string) => {
        navigate(`/${subcategory === 'side-dishes' ? 'vegan' : category}/${subcategory}`);
    };

    return (
        <Flex w='100%' direction='column'>
            <PageHeader
                title={foundCategory?.title}
                description={foundCategory?.description}
                selectedOptions={excludedIngredients}
                onChange={setExcludedIngredients}
                setSelectedCategory={setSelectedCategory}
                setSelectedSide={setSelectedSide}
                setSelectedMeat={setSelectedMeat}
                selectedCategory={selectedCategory}
                selectedMeat={selectedMeat}
                selectedSide={selectedSide}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                categoriesIds={categoriesIds}
                setCategoriesIds={setCategoriesIds}
                filterCategory={categoryData}
                isLoading={isLoading}
                searchResultsCount={searchResultsCount}
            />

            {isFilterApplied && (
                <SearchFilter
                    filteredData={categoryData}
                    categoryData={categoryData!}
                    searchQuery={searchQuery}
                    categoriesIds={categoriesIds}
                    allergens={allergens}
                    meat={meat}
                    garnish={side}
                    onLoadingChange={(val) => setIsLoading(val)}
                    setSearchResultsCount={setSearchResultsCount}
                />
            )}

            {!isFilterApplied && (
                <Tabs index={tabIndex!} onChange={handleTabChange} align='start'>
                    <TabList
                        maxW={{ base: '328px', sm: '860px', lg: 'fit-content' }}
                        overflowX='auto'
                        overflowY='hidden'
                        sx={{
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'transparent',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'transparent',
                            },
                        }}
                    >
                        {foundCategory?.subCategories.map((item: Category, i: number) => (
                            <Tab
                                data-test-id={`tab-${item.category}-${item.category === 'side-dishes' ? 1 : i}`}
                                onClick={() =>
                                    handleNavigate(foundCategory?.category, item.category)
                                }
                                key={item._id}
                                _selected={{
                                    color: 'var(--lime-600)',
                                    borderBottom: '4px solid var(--lime-600)',
                                }}
                                whiteSpace='nowrap'
                            >
                                <Text
                                    fontSize={{ md: '16px', base: '14px' }}
                                    fontWeight='500'
                                    lineHeight='150%'
                                    textAlign='center'
                                >
                                    {item.title}
                                </Text>
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {foundCategory?.subCategories.map((item: Category, i: number) => (
                            <TabPanel key={item._id} p='0'>
                                {tabIndex === i && (
                                    <TabComponent
                                        searchQuery={searchQuery}
                                        categoriesId={item._id}
                                        categoryData={categoryData}
                                    />
                                )}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            )}
        </Flex>
    );
};
