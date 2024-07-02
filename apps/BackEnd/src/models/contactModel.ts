import mongoose, { Schema, Document } from "mongoose";

interface Contact extends Document {
  email: string;
  firstName: string;
  lastName: string;
  content: string;
  status: string;
  referent?: mongoose.Schema.Types.ObjectId;
}

const ContactSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, required: true, default: "non consulté" },
  referent: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
});

const ContactModel = mongoose.model<Contact>("Contact", ContactSchema);

export default ContactModel;
