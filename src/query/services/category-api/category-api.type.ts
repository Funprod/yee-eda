export type Category = {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: SubCategory[];
    rootCategoryId: string;
};

export type SubCategory = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};
