import mongoose, { Schema, Document, Model } from "mongoose";

interface IMembers extends Document {
  firstname: string;
  lastname: string;
  role: Role ;
}
enum Role {
  Président = "Président",
  Trésorier = "Trésorier",
  Secrétaire = "Secrétaire",
  Membre = "Membre",
}


const memberSchema: Schema<IMembers> = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, required: true },
});

const Member: Model<IMembers> = mongoose.model<IMembers>("Member", memberSchema);

export default Member;
export { IMembers };
