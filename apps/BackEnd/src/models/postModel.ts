import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  titlePost: string;
  content: string;
  date: Date;
  image?: string;
  categorie?: string;
}

const PostSchema: Schema = new Schema({
  titlePost: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String },
  categorie: { type: String },
});

const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;
