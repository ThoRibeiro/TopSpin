import mongoose, { Schema, Document, Model } from "mongoose";

interface IComment extends Document {
  message: string;
  idPost: mongoose.ObjectId;
  idUser: mongoose.ObjectId;
}

const commentSchema: Schema<IComment> = new Schema({
  message: { type: String, required: true },
  idPost: { type: mongoose.Types.ObjectId, required: true },
  idUser: { type: mongoose.Types.ObjectId, required: true }
});

const Comment: Model<IComment> = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
export { IComment };
