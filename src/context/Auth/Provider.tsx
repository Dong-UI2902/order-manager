import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import authService from "./services";
import { useLocation } from "react-router-dom";
import {
  getCookieValue,
  removeCookie,
  setAuthToken,
  setCookie,
} from "../../config/Api";
import { AuthContextAPI, User, UserSignup, AuthCredential } from "./types";

const AuthContext = createContext<AuthContextAPI>({} as AuthContextAPI);

const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [shippers, setShippers] = useState<User[]>([]);
  const location = useLocation();

  useEffect(() => {
    setLoadingInitial(true);

    if (error) setError(undefined);
    setAuthToken(getCookieValue("token"));

    authService
      .getCurrentUser()
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(undefined);
        setAuthToken(null);
      })
      .finally(() => setLoadingInitial(false));
  }, [location.pathname]);

  useEffect(() => {
    if (user && user.role === "SHIPPER") {
      if (location.pathname !== "/shipper") window.location.href = "/shipper";
    }
  }, [user]);

  const register = (userSignup: UserSignup) => {
    setLoading(true);
    // if (userSignup.passwordConfirmation !== userSignup.password) {
    //   setError("Xác nhận mật khẩu chưa đúng");
    //   return setLoading(false);
    // }

    authService
      .register(userSignup)
      .then((res) => {
        window.location.href = "/login";
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const login = (credential: AuthCredential) => {
    setLoading(true);
    authService
      .login(credential)
      .then((res) => {
        if (res.accessToken) setCookie(res.accessToken);
        window.location.href = "/";
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setLoading(true);
    setUser(undefined);
    removeCookie();
    window.location.href = "/";
  };

  const getShipper = () => {
    setLoading(true);
    authService
      .getShipper()
      .then((res) => setShippers(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const memoValue = useMemo(
    () => ({
      user,
      loading,
      error,
      logout,
      login,
      register,
      getShipper,
      shippers,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextAPI => useContext(AuthContext);

export default AuthProvider;
