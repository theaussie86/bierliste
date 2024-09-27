import { models, model, Schema } from "mongoose";

export interface DrinkSchema {
  name: string;
  price: number;
  archived: boolean;
  team: Schema.Types.ObjectId;
}

const drinkSchema = new Schema<DrinkSchema>(
  {
    name: String,
    price: Number,
    archived: { type: Boolean, default: false },
    team: { type: Schema.Types.ObjectId, ref: "Team" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

export default models.Drink || model<DrinkSchema>("Drink", drinkSchema);
