import { AuthCredential, UserSignup, AuthResponse, ShipperResponse } from './types';
import Api from '../../config/Api';

async function login(credential: AuthCredential): Promise<AuthResponse> {
  const response = await Api.post('auth/login', credential);

  return response.data;
}

async function register(credential: UserSignup): Promise<AuthResponse> {
  const response = await Api.post('auth/register', credential);

  return response.data;
}


async function getCurrentUser() {
  const response = await Api.get('auth/me');

  return response.data;
}

async function getShipper(): Promise<ShipperResponse> {
  const response = await Api.get('auth/shipper');

  return response.data;
}

export default {
  getCurrentUser,
  register,
  login,
  getShipper
};
