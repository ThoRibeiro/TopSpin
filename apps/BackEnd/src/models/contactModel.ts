import mongoose, { Schema, Document } from "mongoose";

interface Contact extends Document {
  email: string;
  firstName: string;
  lastName: string;
  content: string;
}

const ContactSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  content: { type: String, required: true },
});

const ContactModel = mongoose.model<Contact>("Contact", ContactSchema);

export default ContactModel;
