import { LoginCredentials } from './LoginCredentials';

export interface RegisterCredentials extends LoginCredentials {
  key: string;
}
