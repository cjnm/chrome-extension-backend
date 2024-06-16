import { Schema, model, models, InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    user: { type: Schema.Types.Number, ref: "User", index: true },
    name: Schema.Types.String,
    price: Schema.Types.String,
    image: Schema.Types.String,
    rating: Schema.Types.String,
    product_highlight: Schema.Types.String,
    seller: Schema.Types.String,
    seller_url: Schema.Types.String,
    return_policy: Schema.Types.String,
    delivery_type: Schema.Types.String,
    delivery_charge: Schema.Types.String,
    delivery_time: Schema.Types.String,
    product_url: Schema.Types.String,
  },
  { timestamps: true },
);

export type SchemaType = InferSchemaType<typeof productSchema>;

const Product = models?.Product || model<SchemaType>("Product", productSchema);

export { Product };
