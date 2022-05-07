export enum UserType {
  MEMBER,
  BOT,
  OFFICIAL,
}
export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password?: string;
  avatar?: string;
  is_verified: boolean;
  user_type: UserType;
  created_at?: Date;
}
