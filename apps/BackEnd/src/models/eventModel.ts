import mongoose, { Schema, Document } from "mongoose";

// Définir une interface pour le sous-objet participer
interface IParticipant {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
}

export interface IEvent extends Document {
  title: string;
  startDate: Date;
  endDate: Date;
  category: "senior" | "jeune" | "adulte";
  status: "ouvert" | "fermé";
  images: string[];
  content: string;
  participate: IParticipant[];
}

const eventSchema: Schema = new Schema({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  category: {
    type: String,
    enum: ["senior", "jeune", "adulte"],
    required: true,
  },
  status: { type: String, enum: ["ouvert", "fermé"], required: true },
  images: { type: [String], required: true },
  content: { type: String, required: true },
  participate: [
    {
      email: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      age: { type: Number, required: true },
    },
  ],
});

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
