import { IUser } from "@/stores/user/user.interface";

export interface BasicIResponse {
  status: boolean;
  msg: string;
}

export interface IAuthResponse extends BasicIResponse {
  user: Omit<IUser, "password">;
}

export interface ILoginResponse extends BasicIResponse {
  data: {
    user: IUser;
    token: string;
  };
}
