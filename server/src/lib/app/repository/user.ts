import { userEntity } from '@lib/entities';
import { User, IUserModel } from '../database/mongo';
import { RequireAtLeastOne } from '@lib/util/type-helper';

export const userRepository: IUserRepository = {
  signUp: async userData => {
    const user = new User(userData);
    await user.save();
    return user.toJSON();
  },

  getUser: async userData => {
    const user = await User.findOne({ ...userData });
    return user;
  },
  updateUser: async (userId, data) => {
    return await User.findOneAndUpdate({ _id: userId }, data, {
      new: true,
      projection: { password: 0 },
    });
  },
};

export interface IUserRepository {
  signUp: (
    userData: Omit<userEntity, '_id'> & { _id?: string },
  ) => Promise<IUserModel>;
  getUser: (
    data: RequireAtLeastOne<Pick<userEntity, '_id' | 'email'>>,
  ) => Promise<IUserModel | null>;
  updateUser: (
    userId: string,
    data: Partial<Omit<userEntity, '_id'>>,
  ) => Promise<IUserModel | null>;
}
