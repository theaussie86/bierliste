import mongoose, { Schema } from "mongoose";
import toJSON from "./plugins/toJSON";

const teamSchema = new mongoose.Schema(
  {
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

teamSchema.plugin(toJSON);

export default mongoose.models.Team || mongoose.model("Team", teamSchema);
