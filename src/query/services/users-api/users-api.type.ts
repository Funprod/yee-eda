export type GetMeResponse = {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: string[];
    drafts: Draft[];
    subscriptions: string[];
    subscribers: string[];
    photoLink: string;
    notes: Note[];
};

export type Draft = {
    _id: string;
    image: string;
    title: string;
    time: number;
    description: string;
    categoriesIds: string[];
};
export type Note = {
    _id: string;
    date: string;
    text: string;
};

export type UpdateUserInfoRequest = {
    email: string;
    login: string;
    firstName: string;
    lastName: string;
};
export type UpdatePasswordRequest = {
    password: string;
    newPassword: string;
    confirmPassword: string;
};

export type GetAllUsersResponse = {
    firstName: string;
    id: string;
    lastName: string;
    login: string;
    photo: string;
};
