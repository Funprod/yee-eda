import { useEffect } from 'react';

export const useResetFiltersOnCategoryChange = ({
    category,
    setSelectedCategory,
    setSelectedMeat,
    setSelectedSide,
    setExcludedIngredients,
    setSearchQuery,
}: {
    category: string | undefined;
    setSelectedCategory: (val: string) => void;
    setSelectedMeat: (val: string[]) => void;
    setSelectedSide: (val: string[]) => void;
    setExcludedIngredients: (val: string[]) => void;
    setSearchQuery: (val: string) => void;
}) => {
    useEffect(() => {
        setSelectedCategory('');
        setSelectedMeat([]);
        setSelectedSide([]);
        setExcludedIngredients([]);
        setSearchQuery('');
    }, [category]);
};
