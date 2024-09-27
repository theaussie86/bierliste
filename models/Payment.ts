import { model, models, Schema } from "mongoose";

export interface PaymentSchema {
  user: Schema.Types.ObjectId;
  amount: number;
  team: Schema.Types.ObjectId;
}

const paymentSchema = new Schema<PaymentSchema>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    team: { type: Schema.Types.ObjectId, ref: "Team" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

export default models.Payment || model<PaymentSchema>("Payment", paymentSchema);
