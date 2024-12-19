export type TUser = {
    userId: string; // UUID for user ID
    email: string; // User's email
    firstName: string | null; // Optional first name
    lastName: string | null; // Optional last name
    createdAt: Date; // Creation timestamp
    updatedAt: Date; // Last update timestamp
};

export type  TUserInput = {
    id: string;
    firstName?: string | null | undefined;
    lastName?:  string | null | undefined;
    email?: string | null;
    primaryEmailAddress?: {
        emailAddress: string
    } | undefined
};
