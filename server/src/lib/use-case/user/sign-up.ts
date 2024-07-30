import { userEntity } from '@lib/entities';
import { IUserRepository } from '../../app/repository/user';
import { ISignUpUseCase, ISignUpUserUseCaseArgs } from '../interface/user';

export class SignUpUseCase implements ISignUpUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: ISignUpUserUseCaseArgs): Promise<userEntity> {
    return await this.userRepository.signUp(data);
  }
}
