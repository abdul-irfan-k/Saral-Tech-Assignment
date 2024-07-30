import authUseCases from '../use-case';
import { PostSignInWithGoogleController } from './auth/login-with-goole';
import { SignInController } from './auth/sign-in';
import { SignUpController } from './auth/sign-up';
import { GetAllChatUserController } from './user/get-all-chat-user';
import { GetUserController } from './user/get-user';

const postSignIn = new SignInController(
  authUseCases.signInUseCase,
  authUseCases.getUserUseCase,
);
const postSignUp = new SignUpController(
  authUseCases.signUpUseCase,
  authUseCases.getUserUseCase,
);
const loginWithGoogle = new PostSignInWithGoogleController(
  authUseCases.loginWithGoogleUseCase,
);

const getUser = new GetUserController(authUseCases.getUserUseCase);
const getAllChatUser = new GetAllChatUserController(
  authUseCases.getAllChatUserUseCase,
);

export { postSignIn, postSignUp, loginWithGoogle, getUser, getAllChatUser };
