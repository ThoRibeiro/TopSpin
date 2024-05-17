import mongoose, { Schema, Document, Model } from "mongoose";

interface IPost extends Document {
  titlePost: string;
  content: string;
  date: Date;
  image?: string;
}

const postSchema: Schema<IPost> = new Schema({
  titlePost: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  image: { type: String },
});

const Post: Model<IPost> = mongoose.model<IPost>("Post", postSchema);

export default Post;
export { IPost };
