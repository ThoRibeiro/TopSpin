import mongoose, { Document, Schema } from "mongoose";
import { IMembers } from "./memberModel";

export interface IPost extends Document {
  titlePost: string;
  content: string;
  date: Date;
  image?: string;
  categorie?: string;
  member: IMembers["_id"];
}

const PostSchema: Schema = new Schema({
  titlePost: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String },
  categorie: { type: String },
  member: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
});

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
