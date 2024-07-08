import mongoose, { Schema, Document, Types } from "mongoose";

export interface IParticipant {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  status: "non-inscrit" | "inscrit";
}

export interface IEvent extends Document {
  title: string;
  startDate: Date;
  endDate: Date;
  category: "senior" | "jeune" | "adulte" | "toute catégorie";
  status: "ouvert" | "fermé";
  images: string[];
  content: string;
  participants: Types.DocumentArray<IParticipant>;
}

const participantSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, enum: ["non-inscrit", "inscrit"], required: true },
});

const eventSchema: Schema = new Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  category: {
    type: String,
    enum: ["senior", "jeune", "adulte", "toute catégorie"],
    required: true,
  },
  status: { type: String, enum: ["ouvert", "fermé"], required: true },
  images: { type: [String], required: true },
  content: { type: String, required: true },
  participants: [participantSchema],
});

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
