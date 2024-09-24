import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

interface UserSchema extends mongoose.Document {
  kindeId: string;
  teams: string[];
}

// USER SCHEMA
const userSchema = new mongoose.Schema<UserSchema>(
  {
    kindeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    teams: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Team",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

export default mongoose.models.User ||
  mongoose.model<UserSchema>("User", userSchema);
