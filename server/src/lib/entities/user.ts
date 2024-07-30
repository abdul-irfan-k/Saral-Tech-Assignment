export interface userEntity {
  _id: string;
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string;
  isBlocked?: boolean;
}
