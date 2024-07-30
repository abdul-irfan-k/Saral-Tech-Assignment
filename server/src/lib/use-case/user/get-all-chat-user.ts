import { IUserRepository } from '@lib/app/repository';
import {
  IGetAllChatUserUseCase,
  IGetUserUseCase,
  IGetUserUseCaseArgs,
} from '../interface/user';
import { userEntity } from '@lib/entities';

export class GetAllChatUserUseCase implements IGetAllChatUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(args: IGetUserUseCaseArgs): Promise<any | null> {
    //@ts-ignore
    return await this.userRepository.getAllChatUser(args._id);
  }
}
