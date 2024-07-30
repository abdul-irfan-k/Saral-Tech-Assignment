import { IUserRepository } from '../../app/repository/user';
import {
  ISignInWithGoogleUseCase,
  ISignInWithGoogleUseCaseArgs,
} from '../interface/user';
import { BadRequestError } from '@lib/util/bad-request-error';
import { userEntity } from '@lib/entities';
import axios from 'axios';

export class SignInWithGoogleUseCase implements ISignInWithGoogleUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(
    args: ISignInWithGoogleUseCaseArgs,
  ): Promise<userEntity | null> {
    try {
      const { data: fetchedUserData } = await axios.get(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        {
          headers: { Authorization: `Bearer ${args.accessToken}` },
        },
      );
      console.log(fetchedUserData);
      const user = await this.userRepository.getUser({
        email: fetchedUserData.email,
      });

      return user;
    } catch (error) {
      return null;
    }
  }
}
