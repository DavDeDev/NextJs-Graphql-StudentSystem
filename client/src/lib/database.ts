import mongoose from 'mongoose';

let isConnected: boolean = false; // to check the connected status to DB

export const connectToDB = async ()  => {
  mongoose.set('strictQuery', true);

  if (isConnected) return console.log('🌿 Already connected to MongoDB');

  if (!process.env.MONGODB_URL) return console.log('❌🌿 MONGODB_URL not found');

  await mongoose
    .connect(process.env.MONGODB_URL, {
      retryWrites: true,
      writeConcern: { w: 'majority' }
    })
    .then(() => {
      isConnected = true;
      console.log('🟢🌿 Connected to MongoDB');
    })
    .catch((err: any) => console.log(err));
};
