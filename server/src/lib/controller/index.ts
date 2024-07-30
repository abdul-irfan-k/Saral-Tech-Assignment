import authUseCases from '../use-case';
import { PostSignInWithGoogleController } from './user/login-with-goole';
import { SignInController } from './user/sign-in';
import { SignUpController } from './user/sign-up';

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

export { postSignIn, postSignUp, loginWithGoogle };
