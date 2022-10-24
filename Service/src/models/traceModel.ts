import { model, Schema, Document } from 'mongoose';

// * Collection name definition
const name = 'traces';

// * TS Interface definition
interface IBase extends Document {
  information: unknown;
  details: unknown;
  message: string;
  project: string;
  address: string;
  exception: boolean;
  date: Date;
}

// * Mongoose schema definition
const schema: Schema = new Schema(
  {
    information: Schema.Types.Mixed,
    details: Schema.Types.Mixed,
    message: String,
    project: { type: String, required: true },
    address: String,
    exception: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
  },
  { collection: name },
);

// ! Model export
export default model<IBase>(name, schema);
