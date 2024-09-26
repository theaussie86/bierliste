import mongoose, { Schema } from "mongoose";
import toJSON from "./plugins/toJSON";

export interface TeamSchema extends mongoose.Document {
  name: string;
  users: Schema.Types.ObjectId[];
}

const teamSchema = new mongoose.Schema<TeamSchema>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    users: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

teamSchema.plugin(toJSON);

export default mongoose.models.Team ||
  mongoose.model<TeamSchema>("Team", teamSchema);
