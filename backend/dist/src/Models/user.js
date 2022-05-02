"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
var UserType;
(function (UserType) {
    UserType[UserType["MEMBER"] = 0] = "MEMBER";
    UserType[UserType["BOT"] = 1] = "BOT";
    UserType[UserType["OFFICIAL"] = 2] = "OFFICIAL";
})(UserType || (UserType = {}));
const userSchema = new mongoose_1.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    is_verified: { type: Boolean, default: false },
    user_type: { type: mongoose_1.Schema.Types.String, enum: UserType, default: UserType.MEMBER, required: true },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
