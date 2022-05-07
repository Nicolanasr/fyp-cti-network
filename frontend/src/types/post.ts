import { IUser } from "./user";

interface Author extends IUser {
    _id: string;
}

export interface IPost {
    _id: string;
    author?: Author;
    created_at?: Date;
    text?: string;
    images?: string[];
    url?: string;
    likes?: { user_id: string }[];
    comments?: {
        user_id: string;
        text: String;
        created_at: Date;
    }[];
    liked_by_user?: boolean;
}
