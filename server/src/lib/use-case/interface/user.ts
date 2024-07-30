import { userEntity } from '@lib/entities';

export interface IForgotPasswordUseCaseArgs {
  email: string;
  userId: string;
}

export interface IUpdatePasswordWithTokenUseCaseArgs {
  email: string;
  _id: string;
  newPassword: string;
  token: string;
}

export type ISignInWithGoogleUseCaseArgs = {
  accessToken: string;
};
export interface IUpdatePwdWithOldPwdUseCaseArgs {
  email: string;
  _id: string;
  oldPassword: string;
  newPassword: string;
  newComfirmPassword: string;
}
export type IGetUserUseCaseArgs = RequireAtLeastOne<{
  email: string;
  _id: string;
}>;

export interface ISignInUserUseCaseArgs {
  email: string;
  password: string;
}
export type ISignUpUserUseCaseArgs = Omit<userEntity, '_id'> & {
  _id?: string;
};

export interface IGetUserUseCase {
  execute(args: IGetUserUseCaseArgs): Promise<userEntity | null>;
}

export interface ISignInUseCase {
  execute(args: ISignInUserUseCaseArgs): Promise<{ isValidUser: boolean }>;
}

export interface ISignUpUseCase {
  execute(args: ISignUpUserUseCaseArgs): Promise<userEntity>;
}

export interface IForgotPasswordUseCase {
  execute(args: IForgotPasswordUseCaseArgs): Promise<tokenEntity>;
}

export interface IUpdatePasswordWithTokenUseCase {
  execute(
    args: IUpdatePasswordWithTokenUseCaseArgs,
  ): Promise<{ isUpdated: boolean }>;
}

export interface IUpdatePwdWithOldPwdUseCase {
  execute(
    args: IUpdatePwdWithOldPwdUseCaseArgs,
  ): Promise<{ isUpdated: boolean }>;
}
export interface ISignInWithGoogleUseCase {
  execute(args: ISignInWithGoogleUseCaseArgs): Promise<userEntity | null>;
}
type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> &
    Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];
