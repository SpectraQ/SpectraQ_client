import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import {
  register,
  login,
  verifyEmail,
  resendOtp,
  changePassword,
  validateToken,
  forgotPassword,
  validateResetToken,
  resetPassword,
  fetchUserDetails,
  fetchUserEmailById,
  logout as logoutAction,
  clearError,
  clearMessage,
  setUserAndToken,
} from "../store/auth";
import { setAuthToken } from "../store/api/axiosConfig";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();

  const { user, token, loading, error, message } = useSelector(
    (state: RootState) => state.auth
  );

  // Derived
  const isAuthenticated = useMemo(() => !!token && !!user, [token, user]);

  // Initialize axios auth header from token in state (useful on mount)
  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  // Thunk wrappers - return the dispatch promise (so consumers can await .unwrap())
  const registerUser = useCallback(
    (payload: {
      email: string;
      password: string;
      role: string;
      mobileNumber: string;
      username: string;
      firstName: string;
      lastName: string;
    }) => {
      return dispatch(register(payload));
    },
    [dispatch]
  );

  const loginUser = useCallback(
    (payload: { email: string; password: string }) => {
      return dispatch(login(payload));
    },
    [dispatch]
  );

  const verifyUser = useCallback(
    (payload: { email: string; otp: number }) => {
      return dispatch(verifyEmail(payload));
    },
    [dispatch]
  );

  const resendOtpToEmail = useCallback(
    (payload: { email: string }) => {
      return dispatch(resendOtp(payload));
    },
    [dispatch]
  );

  const changeUserPassword = useCallback(
    (payload: { oldPassword: string; newPassword: string }) => {
      return dispatch(changePassword(payload));
    },
    [dispatch]
  );

  const validateAuthToken = useCallback(
    (opts?: { token?: string }) => {
      
      if (opts?.token) setAuthToken(opts.token);
      return dispatch(validateToken(opts ?? undefined));
    },
    [dispatch]
  );

  const forgotUserPassword = useCallback(
    (payload: { email: string }) => {
      return dispatch(forgotPassword(payload));
    },
    [dispatch]
  );

  const validateReset = useCallback(
    (payload: { token: string }) => {
      return dispatch(validateResetToken(payload));
    },
    [dispatch]
  );

  const resetUserPassword = useCallback(
    (payload: { token: string; password: string }) => {
      return dispatch(resetPassword(payload));
    },
    [dispatch]
  );

  const getUserDetails = useCallback(
    (payload: { username: string }) => {
      return dispatch(fetchUserDetails(payload));
    },
    [dispatch]
  );

  const getUserEmailById = useCallback(
    (payload: { userId: string }) => {
      return dispatch(fetchUserEmailById(payload));
    },
    [dispatch]
  );

  // Simple actions
  const logout = useCallback(() => {
    // also clear axios header and local storage (authSlice.logout will already call setAuthToken(null))
    setAuthToken(null);
    return dispatch(logoutAction());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearAuthMessage = useCallback(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  /**
   * Manually set user & token in state (useful if you obtain token externally)
   * This will set axios header and persist the values from the slice implementation.
   */
  const setCredentials = useCallback(
    (payload: { user: any; token: string }) => {
      setAuthToken(payload.token);
      return dispatch(setUserAndToken(payload));
    },
    [dispatch]
  );

  return {
    // state
    user,
    token,
    loading,
    error,
    message,
    isAuthenticated,

    // actions
    registerUser,
    loginUser,
    verifyUser,
    resendOtpToEmail,
    changeUserPassword,
    validateAuthToken,
    forgotUserPassword,
    validateReset,
    resetUserPassword,
    getUserDetails,
    getUserEmailById,
    logout,
    clearAuthError,
    clearAuthMessage,
    setCredentials,
  } as const;
}

export default useAuth;
