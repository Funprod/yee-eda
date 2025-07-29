import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import useRecipeFilters from '~/hooks/useRecipeFilters';
import { categoriesSelector } from '~/store/app-slice';
import { useCategoriesWithSubcategories } from '~/utils/getCategoriesWithSubcategories';

import { PageHeader } from '../PageHeader/PageHeader';
import { SearchFilter } from '../SearchFilter/SearchFilter';
import { CookingBlogsSection } from './CookingBlogsSection/CookingBlogsSection';
import { JuiciestSection } from './JuiciestSection/JuiciestSection';
import { NewRecipesSection } from './NewRecipesSection/NewRecipesSection';

export const Main = () => {
    const {
        excludedIngredients,
        setExcludedIngredients,
        selectedCategory,
        selectedMeat,
        selectedSide,
        setSelectedCategory,
        setSelectedMeat,
        setSelectedSide,
        searchQuery,
        setSearchQuery,
        categoriesIds,
        setCategoriesIds,
        allergens,
        meat,
        side,
    } = useRecipeFilters();

    const [isFilterApplied, setIsFilterApplied] = useState<string | boolean>(false);
    const [searchResultsCount, setSearchResultsCount] = useState<number>(0);
    const categoryDataRedux = useSelector(categoriesSelector);
    const localDataString = localStorage.getItem('cachedCategories');
    const categoryDataLocal = JSON.parse(localDataString!);

    const categoryData =
        categoryDataRedux && categoryDataRedux.length > 0 ? categoryDataRedux : categoryDataLocal;
    const filterCategory = useCategoriesWithSubcategories(categoryDataRedux);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const isApplied =
            excludedIngredients.length > 0 ||
            selectedCategory ||
            selectedMeat.length > 0 ||
            selectedSide.length > 0 ||
            searchQuery.length > 0;

        setIsFilterApplied(!!isApplied);
    }, [excludedIngredients, selectedCategory, selectedMeat, selectedSide, searchQuery]);

    return (
        <Flex w='100%' direction='column'>
            <PageHeader
                title='Приятного аппетита!'
                selectedOptions={excludedIngredients}
                onChange={setExcludedIngredients}
                setSelectedCategory={setSelectedCategory}
                setSelectedSide={setSelectedSide}
                setSelectedMeat={setSelectedMeat}
                selectedCategory={selectedCategory}
                selectedMeat={selectedMeat}
                selectedSide={selectedSide}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterCategory={filterCategory}
                categoriesIds={categoriesIds}
                setCategoriesIds={setCategoriesIds}
                isLoading={isLoading}
                searchResultsCount={searchResultsCount}
            />
            {isFilterApplied ? (
                <SearchFilter
                    filteredData={filterCategory}
                    categoryData={categoryData}
                    searchQuery={searchQuery}
                    categoriesIds={categoriesIds}
                    allergens={allergens}
                    meat={meat}
                    garnish={side}
                    onLoadingChange={(val) => setIsLoading(val)}
                    setSearchResultsCount={setSearchResultsCount}
                />
            ) : (
                <>
                    <NewRecipesSection />
                    <JuiciestSection categoryData={categoryData} />
                </>
            )}
            <CookingBlogsSection />
        </Flex>
    );
};
