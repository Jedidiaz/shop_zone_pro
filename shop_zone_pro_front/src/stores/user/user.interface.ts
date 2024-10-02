
export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  status: boolean;
  createdAt?: Date;
}

export interface State {
  user: IUser | null;
  token: string | null;
}

export interface SignInProps {
  user: IUser,
  token: string;
}

export interface Action {
  signIn: (props: SignInProps) => void;
  logOut: () => void;
}
