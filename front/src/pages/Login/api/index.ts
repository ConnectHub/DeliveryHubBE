import { api } from '../../../services/api';
import { FormValues, LoginResponse } from '../interfaces';

export async function login(values: FormValues): Promise<LoginResponse> {
  return (await api.post('/auth/login', values)).data;
}
