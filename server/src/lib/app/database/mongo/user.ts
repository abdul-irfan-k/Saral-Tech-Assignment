import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

interface IUserSchema {
  _id: string;
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string | undefined;
  isBlocked: boolean;
}

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4() },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  next();
});

userSchema.methods.checkIsCorrectPassword = async function (
  plainPassword: string,
) {
  const isCorrectPassword = await bcrypt.compare(plainPassword, this.password);
  return isCorrectPassword;
};

userSchema.methods.changePassword = async function (password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);
  this.password = hashedPassword;
  return { isValid: true, isChangedPassword: true };
};

interface methodInterface {
  checkIsCorrectPassword(plainPassword: string): boolean;
  changePassword(password: string): {
    isValid: boolean;
    isChangedPassword: boolean;
  };
}

export interface IUserModel extends IUserSchema, methodInterface {}
const UserModel = mongoose.model<IUserModel>('User', userSchema);
export default UserModel;
