import { IUserRepository } from '@lib/app/repository';
import { IGetUserUseCase, IGetUserUseCaseArgs } from '../interface/user';
import { userEntity } from '@lib/entities';

export class GetUserUseCase implements IGetUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(args: IGetUserUseCaseArgs): Promise<userEntity | null> {
    const userDetails = await this.userRepository.getUser(args);
    return userDetails;
  }
}
