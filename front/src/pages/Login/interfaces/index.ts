export interface FormValues {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  authToken: string;
}