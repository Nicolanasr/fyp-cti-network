import { Schema, model } from "mongoose";

const validateEmail = (email: string): Boolean => {
	var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

enum UserType {
	MEMBER,
	BOT,
	OFFICIAL,
}

export interface IUser {
	first_name?: string;
	last_name?: string;
	email?: string;
	username?: string;
	password?: string;
	avatar?: string;
	is_verified?: boolean;
	user_type?: UserType;
	created_at?: Date;
}

const userSchema = new Schema<IUser>(
	{
		first_name: { type: String, required: true },
		last_name: { type: String },
		email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			required: true,
			validate: [validateEmail, "Please fill a valid email address"],
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
		},
		username: { type: String, required: true, minlength: 4, unique: true },
		password: {
			type: String,
			minlength: 8,
			required: true,
		},
		avatar: { type: String, default: "https://ucarecdn.com/ee1899bc-a0b2-425a-8736-9c5eec803aa2/profileimgplaceholder.png" },
		is_verified: { type: Boolean, default: false },
		user_type: { type: Schema.Types.String, enum: UserType, default: UserType.MEMBER, required: true },
		created_at: { type: Date, default: () => Date.now() },
	},
	{ timestamps: true }
);

export const User = model<IUser>("User", userSchema);
