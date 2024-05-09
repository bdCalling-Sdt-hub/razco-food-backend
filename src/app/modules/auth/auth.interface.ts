export type IAuth = {
  email: string;
  password: string;
};

export type IVerifyEmail = {
  email: string;
  code: string;
};

export type IChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
