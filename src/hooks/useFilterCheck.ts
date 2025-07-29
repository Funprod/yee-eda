import { useEffect, useState } from 'react';

type Args = {
    excludedIngredients: string[];
    selectedCategory: string;
    selectedMeat: string[];
    selectedSide: string[];
    searchQuery: string;
};

export const useFilterCheck = ({
    excludedIngredients,
    selectedCategory,
    selectedMeat,
    selectedSide,
    searchQuery,
}: Args) => {
    const [isFilterApplied, setIsFilterApplied] = useState(false);

    useEffect(() => {
        const isApplied =
            excludedIngredients.length > 0 ||
            selectedCategory ||
            selectedMeat.length > 0 ||
            selectedSide.length > 0 ||
            searchQuery.length > 0;

        setIsFilterApplied(!!isApplied);
    }, [excludedIngredients, selectedCategory, selectedMeat, selectedSide, searchQuery]);

    return isFilterApplied;
};
