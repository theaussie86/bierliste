import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";
import Team, { TeamSchema } from "./Team";

export interface UserSchema extends mongoose.Document {
  kindeId: string;
  name: string;
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
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.methods.updateName = async function (
  newName: string
): Promise<void> {
  this.name = newName;
  await this.save();
};

userSchema.methods.getTeams = async function (): Promise<TeamSchema[]> {
  return Team.find({ users: { $in: [this._id] } }).select({ name: 1, _id: 1 });
};

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

export default mongoose.models.User ||
  mongoose.model<UserSchema>("User", userSchema);
