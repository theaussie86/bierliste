import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

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

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

export default mongoose.models.User ||
  mongoose.model<UserSchema>("User", userSchema);
