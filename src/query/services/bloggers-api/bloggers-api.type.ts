export type GetBloggersRequest = {
    limit: string;
    currentUserId: string;
};

export type GetBloggerByIdRequest = {
    bloggerId: string;
    currentUserId: string;
};

export type GetBloggerByIdResponse = {
    bloggerInfo: BloggerInfo;
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: boolean;
};
export interface BloggerInfo {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: string[];
    drafts: Draft[];
    subscriptions: string[];
    subscribers: string[];
    notes: Note[];
}

export interface Draft {
    _id: string;
    ingredients: Ingredient[];
    steps: Step[];
    categoriesIds: string[];
    title: string;
    description?: string;
    portions?: number;
    time?: number;
    image?: string;
}

export interface Ingredient {
    title?: string;
    count: number;
    measureUnit?: string;
}

export interface Step {
    stepNumber: number;
    description?: string;
    image?: string;
}

export type GetBloggersResponse = {
    favorites: Blogger[];
    others: Blogger[];
};

export type Blogger = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes: Note[];
    newRecipesCount: number;
};

export type Note = {
    _id: string;
    date: string;
    text: string;
};

export type SubscriptionRequest = {
    toUserId: string;
    fromUserId: string;
};
