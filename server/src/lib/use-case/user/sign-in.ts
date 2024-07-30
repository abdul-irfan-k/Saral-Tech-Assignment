import { IUserRepository } from '../../app/repository/user';
import bcrypt from 'bcrypt';
import { ISignInUseCase, ISignInUserUseCaseArgs } from '../interface/user';
import { BadRequestError } from '@lib/util/bad-request-error';

export class SignInUseCase implements ISignInUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute({
    email,
    password,
  }: ISignInUserUseCaseArgs): Promise<{ isValidUser: boolean }> {
    const userDetail = await this.userRepository.getUser({ email });
    if (userDetail == null)
      throw new BadRequestError({ code: 400, message: 'user not found' });
    const isValidUser = await bcrypt.compare(password, userDetail.password);
    return { isValidUser };
  }
}
