import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export const useTabIndex = (subCategories?: { category: string }[]) => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const [tabIndex, setTabIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!subCategories || !currentPath) return;

        const index = subCategories.findIndex((cat) => cat.category === currentPath);
        setTabIndex(index >= 0 ? index : 0);
    }, [currentPath, subCategories]);

    return { tabIndex, setTabIndex };
};
