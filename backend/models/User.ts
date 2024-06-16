import { Schema, model, models, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    id: {
      type: Schema.Types.Number,
      index: true,
      unique: true,
      required: true,
    },
    username: Schema.Types.String,
    avatar_url: Schema.Types.String,
    name: Schema.Types.String,
    email: Schema.Types.String,
  },
  { _id: false, timestamps: true },
);

export type SchemaType = InferSchemaType<typeof userSchema>;

const User = models?.User || model<SchemaType>("User", userSchema);

export { User };
