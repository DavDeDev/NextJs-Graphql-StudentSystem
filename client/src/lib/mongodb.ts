import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URL
const options = {}

let client
let clientPromise: Promise<MongoClient>

// https://github.com/prisma/prisma/discussions/10037#discussioncomment-1569084
let globalWithMongoDB = global as typeof globalThis & { _mongoClientPromise: Promise<MongoClient>; }

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!globalWithMongoDB._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongoDB._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongoDB._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise