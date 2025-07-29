export const ENDPOINTS = {
    RECIPE: 'recipe',
    RECIPE_DRAFT: 'recipe/draft',
    MEASURE_UNITS: 'measure-units',
    RECIPE_CATEGORY: (id: string) => `recipe/category/${id}`,
    RECIPE_BY_ID: (id: string) => `recipe/${id}`,
    RECIPE_LIKE: (id: string) => `recipe/${id}/like`,
    RECIPE_BOOKMARK: (id: string) => `recipe/${id}/bookmark`,
    RECIPE_BY_USER_ID: (id: string) => `recipe/user/${id}`,
    RECIPE_RECOMMEND_BY_ID: (id: string) => `recipe/recommend/${id}`,
};
