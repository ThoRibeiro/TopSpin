import mongoose, { Schema } from "mongoose";

interface User extends Document {
  email: String,
  username: String,
  password: String
}

const UserSchema: Schema = new Schema({
  email : { type:String, required: true },
  username : { type:String, required: true },
  password: { type:String, required: true }
});

const User = mongoose.model<User>("User", UserSchema);

export default User;