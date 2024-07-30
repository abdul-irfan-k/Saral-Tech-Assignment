interface userInterface {
  name: string;
  _id: string;
  email: string;
}

declare namespace Express {
  export interface Request {
    user: userInterface;
  }
}
