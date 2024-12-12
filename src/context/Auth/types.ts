export interface User {
  _id: string;
  name: string;
  username: string;
  role: string;
  createdAt?: string;
}

// export interface PasswordProviderState {
//   password: string;
//   newPassword: string;
//   newPasswordConfirmation: string;
// }

export interface AuthProviderState {
  user?: User;
  shippers: User[];
  loading: boolean;
  error?: string;
}

export interface AuthCredential {
  username: string;
  password: string;
}

export interface UserSignup extends AuthCredential {
  name: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  accessToken: string;
}

export interface ShipperResponse {
  success: boolean;
  message: string;
  data: [];
}

export interface AuthContextAPI extends AuthProviderState {
  login: (credential: AuthCredential) => void;
  register: (credential : UserSignup) => void;
  logout: () => void;
  getShipper: () => void;
}
