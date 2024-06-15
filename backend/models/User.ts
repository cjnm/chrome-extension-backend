import { Schema, model, models, InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    id: Schema.Types.Number,
    username: Schema.Types.String,
    avatar_url: Schema.Types.String,
    name: Schema.Types.String,
    email: Schema.Types.String,
  },
  { timestamps: true },
);

export type SchemaType = InferSchemaType<typeof userSchema>;

const User = models?.User || model<SchemaType>('User', userSchema);

export { User };
