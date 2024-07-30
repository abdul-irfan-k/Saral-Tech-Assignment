import { userEntity } from '@lib/entities';
import { User, IUserModel } from '../database/mongo';
import { RequireAtLeastOne } from '@lib/util/type-helper';

export const userRepository: IUserRepository = {
  signUp: async (userData) => {
    const user = new User(userData);
    await user.save();
    return user.toJSON();
  },

  getUser: async (userData) => {
    const user = await User.findOne({ ...userData });
    return user;
  },
  updateUser: async (userId, data) => {
    return await User.findOneAndUpdate({ _id: userId }, data, {
      new: true,
      projection: { password: 0 },
    });
  },
  getAllChatUser: async (userId) => {
    const allChatUsers = await User.aggregate([
      { $match: { _id: { $ne: userId } } },
      {
        $lookup: {
          from: 'chatrooms',
          let: { receiverId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ['$$receiverId', '$userIds'] },
                    { $in: [userId, '$userIds'] },
                  ],
                },
              },
            },
            { $project: { chatRoomId: '$_id', _id: 0 } },
          ],
          as: 'chatRoom',
        },
      },
      // { $unwind: '$chatRoom' },
      {
        $project: {
          name: 1,
          email: 1,
          userId: 1,
          profileImageUrl: 1,
          chatRoomId: { $arrayElemAt: ['$chatRoom.chatRoomId', 0] },
        },
      },
    ]);
    return allChatUsers;
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
  getAllChatUser: (userId: string) => Promise<any>;
}
