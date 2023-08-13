export interface FormValues {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  authToken: string;
  rate: boolean;
  username: string;
  role: string;
}
