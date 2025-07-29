export type Recipe = {
    data: RecipeData[];
    meta: Meta;
};

export type RecipeData = {
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    proteins: number;
    authorId: string;
    categoriesIds: string[];
    steps: Step[];
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    recommendedByUserId: string[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
};

export type CreateRecipe = {
    title: string;
    description: string | null;
    time: number;
    portions: number;
    categoriesIds: string[];
    image: string;
    steps: Step[];
    ingredients: Ingredient[];
};

export type Step = {
    stepNumber: number;
    description: string | null;
    image: string | null;
};

export type NutritionValue = {
    calories: number;
    proteins: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type Ingredient = {
    title: string | null;
    count: number | null;
    measureUnit: string | null;
};

export type Meta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type GetRecipesQueryArgs = {
    page: number;
    limit: number;
    allergens: string[];
    searchString: string;
    meat: string[];
    garnish: string[];
    subcategoriesIds: string[];
    sortBy: string;
    sortOrder: 'asc' | 'desc';
};

export type GetRecipesParams = {
    page?: number;
    limit?: number;
    allergens?: string;
    searchString?: string;
    id: string;
};
export type GetRecipesById = {
    id: string;
};

export type MeasureUnitsResponse = {
    _id: string;
    name: string;
};
export type GetRecipeByUserId = {
    recipes: RecipeByUserId[];
    myBookmarks: RecipeByUserId[];
    totalBookmarks: number;
    totalSubscribers: number;
    userId: string;
    notes: Note[];
};

export type RecipeByUserId = {
    _id: string;
    createdAt: string;
    title: string;
    description: string;
    time: number;
    image: string;
    views: number;
    portions: number;
    authorId: string;
    recommendedByUserId: string[];
    categoriesIds: string[];
    steps: Step[];
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    likes: number;
    bookmarks: number;
};

export type Note = {
    _id: string;
    date: string;
    text: string;
};
