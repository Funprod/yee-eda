import { useState } from 'react';
import { useSelector } from 'react-redux';

import { categoriesSelector } from '~/store/app-slice';

const useRecipeFilters = () => {
    const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMeat, setSelectedMeat] = useState<string[]>([]);
    const [selectedSide, setSelectedSide] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoriesIds, setCategoriesIds] = useState<string[]>([]);
    const categoryDataRaw = useSelector(categoriesSelector);
    const categoryData = Array.isArray(categoryDataRaw) ? categoryDataRaw : [];
    const allergens = excludedIngredients.flatMap((item) => {
        const match = item.match(/^(.+?)\s*\((.+?)\)/);
        if (match) {
            const [, first, second] = match;
            return [first.trim().toLowerCase(), second.trim().toLowerCase()];
        }
        return [item.trim().toLowerCase()];
    });
    const meat = selectedMeat.map((item) => item.split('(')[0].trim().toLowerCase());
    const side = selectedSide.map((item) => item.split('(')[0].trim().toLowerCase());

    const filteredRecipes = categoryData.filter((recipe) => {
        const categoryMatches =
            selectedCategory === '' ||
            (recipe.category && recipe.category.includes(selectedCategory));

        const searchMatches = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());

        return categoryMatches && searchMatches;
    });

    return {
        filteredRecipes,
        excludedIngredients,
        setExcludedIngredients,
        selectedCategory,
        setSelectedCategory,
        selectedMeat,
        setSelectedMeat,
        selectedSide,
        setSelectedSide,
        searchQuery,
        setSearchQuery,
        categoriesIds,
        setCategoriesIds,
        allergens,
        meat,
        side,
    };
};

export default useRecipeFilters;
