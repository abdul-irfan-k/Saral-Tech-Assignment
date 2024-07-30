import { userRepository } from '@lib/app/repository';
import { SignInUseCase } from './user/sign-in';
import { SignUpUseCase } from './user/sign-up';
import { GetUserUseCase } from './user/get-user';
import { SignInWithGoogleUseCase } from './user/login-with-google';
import { GetAllChatUserUseCase } from './user/get-all-chat-user';

const signInUseCase = new SignInUseCase(userRepository);
const signUpUseCase = new SignUpUseCase(userRepository);
const loginWithGoogleUseCase = new SignInWithGoogleUseCase(userRepository);
const getUserUseCase = new GetUserUseCase(userRepository);
const getAllChatUserUseCase = new GetAllChatUserUseCase(userRepository);

export default Object.freeze({
  signInUseCase,
  getUserUseCase,
  signUpUseCase,
  loginWithGoogleUseCase,
  getAllChatUserUseCase,
});
