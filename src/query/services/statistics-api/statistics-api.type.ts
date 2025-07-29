export type getStatisticsResponse = {
    likes: Like[];
    bookmarks: Bookmark[];
    recommendationsCount: number;
    recipesWithRecommendations: RecipesWithRecommendation[];
};

export type Like = {
    date: string;
    count: number;
};

export type Bookmark = {
    date: string;
    count: number;
};

export type RecipesWithRecommendation = {
    _id: string;
    createdAt: string;
    title: string;
    description: string;
    time: number;
    image: string;
    views: number;
    meat: string;
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

export type Step = {
    stepNumber: number;
    description: string;
};

export type NutritionValue = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type Ingredient = {
    title: string;
    count: string;
    measureUnit: string;
};
