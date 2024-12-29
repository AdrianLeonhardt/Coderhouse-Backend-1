import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    user: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    age: Number,
    password: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
})

const UserModel = mongoose.model("user", userSchema);

export default UserModel;