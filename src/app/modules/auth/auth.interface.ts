export type IAuth = {
  email: string;
  password: string;
};

export type IVerifyEmail = {
  email: string;
  code: number;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
