import { model, Schema, Document } from 'mongoose';

// * Collection name definition
const name = 'logs';

// * TS Interface definition
interface IBase extends Document {
  information: unknown;
  unhandled: boolean;
  date: Date;
  code: number;
  path: string;
  method: string;
}

// * Mongoose schema definition
const schema: Schema = new Schema(
  {
    information: Schema.Types.Mixed,
    unhandled: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    code: Number,
    path: String,
    method: String,
  },
  { collection: name },
);

// ! Model export
export default model<IBase>(name, schema);
