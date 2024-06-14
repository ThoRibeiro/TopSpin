import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  email: string;
  username: string;
  password: string;
  member: mongoose.Schema.Types.ObjectId;
  role: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  role: { type: String, required: true }
});

const User = mongoose.model<User>("User", UserSchema);

export default User;
