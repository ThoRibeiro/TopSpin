import mongoose, { Schema, Document, Model } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: IMembers;
    }
  }
}

interface IMembers extends Document {
  firstname: string;
  lastname: string;
  role: Role;
  image?: string;
}

export enum Role {
  Président = "Président",
  Trésorier = "Trésorier",
  Secrétaire = "Secrétaire",
  Membre = "Membre",
}

const memberSchema: Schema<IMembers> = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
});

const Member: Model<IMembers> = mongoose.model<IMembers>(
  "Member",
  memberSchema,
);

export default Member;
export { IMembers };
