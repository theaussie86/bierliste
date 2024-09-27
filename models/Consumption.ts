import { model, models, Schema } from "mongoose";

export interface ConsumptionSchema {
  user: Schema.Types.ObjectId;
  drink: Schema.Types.ObjectId;
  quantity: number;
  team: Schema.Types.ObjectId;
}

const consumptionSchema = new Schema<ConsumptionSchema>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    drink: { type: Schema.Types.ObjectId, ref: "Drink" },
    quantity: Number,
    team: { type: Schema.Types.ObjectId, ref: "Team" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

export default models.Consumption ||
  model<ConsumptionSchema>("Consumption", consumptionSchema);
