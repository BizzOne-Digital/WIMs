import mongoose, { Schema, type InferSchemaType, type Model } from 'mongoose'

// Connection string lives in .env.local (MONGODB_URI). Without it the site runs on default content.
export const dbConfigured = () => Boolean(process.env.MONGODB_URI)

const g = globalThis as unknown as { __wimsDb?: Promise<typeof mongoose> }

export async function connectDb() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set')
  g.__wimsDb ??= mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DB || undefined, bufferCommands: false, serverSelectionTimeoutMS: 8000 })
  try {
    return await g.__wimsDb
  } catch (e) {
    g.__wimsDb = undefined // allow a retry on the next request
    throw e
  }
}

function model<S extends Schema>(name: string, schema: S) {
  return (mongoose.models[name] as Model<InferSchemaType<S>>) ?? mongoose.model(name, schema)
}

export const ContentDoc = model('Content', new Schema({ key: { type: String, required: true, unique: true }, data: { type: Schema.Types.Mixed, default: {} } }, { timestamps: true, minimize: false }))

const uploadSchema = new Schema({ folder: { type: String, required: true }, filename: { type: String, required: true }, mimeType: { type: String, required: true }, size: { type: Number, required: true }, data: { type: Buffer, required: true } }, { timestamps: true })
uploadSchema.index({ folder: 1, filename: 1 }, { unique: true })
export const StoredUpload = model('StoredUpload', uploadSchema)

export const Inquiry = model('Inquiry', new Schema({ name: String, email: String, organization: String, interest: String, message: String, read: { type: Boolean, default: false } }, { timestamps: true }))
