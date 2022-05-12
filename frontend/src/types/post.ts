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
    comments?: IComment[];
    liked_by_user?: boolean;
}

export interface IComment {
    _id: string;
    user: IUser;
    text: String;
    created_at: Date;
}
