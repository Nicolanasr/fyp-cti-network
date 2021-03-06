"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
var UserType;
(function (UserType) {
    UserType[UserType["MEMBER"] = 0] = "MEMBER";
    UserType[UserType["BOT"] = 1] = "BOT";
    UserType[UserType["OFFICIAL"] = 2] = "OFFICIAL";
})(UserType || (UserType = {}));
const userSchema = new mongoose_1.Schema({
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
    user_type: { type: mongoose_1.Schema.Types.String, enum: UserType, default: UserType.MEMBER, required: true },
    created_at: { type: Date, default: () => Date.now() },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
