import mongoose, { Schema, Document, InferSchemaType, Models, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../lib/constant';


interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  isAdmin: boolean;
}

interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;

}
export type UserModel = Model<IUser, {}, IUserMethods>;
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

userSchema.pre<IUser>('save', async function () {
  if (this.isModified('password') || this.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
      this.password = hashedPassword;
    } catch (error) {
    }
  }
})

userSchema.method('comparePassword', function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
});



const User: UserModel = mongoose.models.User || mongoose.model<UserModel>('User', userSchema, 'users');

export { User };