import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  title: string;
  startDate: Date;
  endDate: Date;
  images: string[];
}

const GallerySchema: Schema = new Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  images: { type: [String], required: true },
});

const GalleryModel = mongoose.model<IGallery>("Gallery", GallerySchema);

export default GalleryModel;
