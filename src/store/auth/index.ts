import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import api, { setAuthToken } from "../api/axiosConfig";

interface User {
  id?: string;
  email?: string;
  role?: string;
  username?: string;
  mobileNumber?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: false,
  error: null,
  message: null,
};

// Register
export const register = createAsyncThunk<
  { message: string; userId: string },
  {
    email: string;
    password: string;
    role: string;
    mobileNumber: string;
    username: string;
    firstName: string;
    lastName: string;
  },
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const { ...rest } = payload;
    const body = { ...rest };
    const res = await api.post("/register", body);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.error || err.message);
  }
});

// Login
export const login = createAsyncThunk<
  { user?: any; token?: string; message?: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await api.post("/login", credentials);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.error || err.message);
  }
});

// Verify email (OTP)
export const verifyEmail = createAsyncThunk<
  { message: string },
  { email: string; otp: number },
  { rejectValue: string }
>("auth/verifyEmail", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.patch("/verify-email", payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.error || err.message);
  }
});

// Resend OTP
export const resendOtp = createAsyncThunk<
  { message: string },
  { email: string },
  { rejectValue: string }
>("auth/resendOtp", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/resend-otp", payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.error || err.message);
  }
});

// Change password (authenticated)
export const changePassword = createAsyncThunk<
  { message: string },
  { oldPassword: string; newPassword: string },
  { rejectValue: string }
>("auth/changePassword", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.patch("/password", payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.error || err.message);
  }
});
export const validateToken = createAsyncThunk<
  { id: string; email: string; role: string; username: string },
  { token?: string } | undefined,
  { rejectValue: string }
>("auth/validateToken", async (payload, { rejectWithValue }) => {
  try {
    if (payload?.token) setAuthToken(payload.token);
    const res = await api.get("/validate");
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.error || err.message);
  }
});

// Forgot password
export const forgotPassword = createAsyncThunk<
  { message: string },
  { email: string },
  { rejectValue: string }
>("auth/forgotPassword", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/forgot-password", payload);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.error || err.message);
  }
});

// Validate reset token (GET /reset-password/:token)
export const validateResetToken = createAsyncThunk<
  { message: string },
  { token: string },
  { rejectValue: string }
>("auth/validateResetToken", async ({ token }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/reset-password/${token}`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.error || err.message);
  }
});

// Reset password
export const resetPassword = createAsyncThunk<
  { message: string },
  { token: string; password: string },
  { rejectValue: string }
>("auth/resetPassword", async ({ token, password }, { rejectWithValue }) => {
  try {
    const res = await api.post(`/reset-password/${token}`, { password });
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.error || err.message);
  }
});

// Get user details by username (requires authorization)
export const fetchUserDetails = createAsyncThunk<
  any,
  { username: string },
  { rejectValue: string }
>("auth/fetchUserDetails", async ({ username }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/user/${encodeURIComponent(username)}`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.error || err.message);
  }
});

// Get user email by id (public)
export const fetchUserEmailById = createAsyncThunk<
  { email: string; username: string },
  { userId: string },
  { rejectValue: string }
>("auth/fetchUserEmailById", async ({ userId }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/user-email/${userId}`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.error || err.message);
  }
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.message = null;
      setAuthToken(null);
      try {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } catch (e) {
        // ignore
      }
    },
    clearError(state) {
      state.error = null;
    },
    clearMessage(state) {
      state.message = null;
    },
    // optionally restore user (if stored separately)
    setUserAndToken(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      setAuthToken(action.payload.token);
      try {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      } catch (e) {
        // ignore
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        // If backend returned token & user => authenticated
        if (payload.token && payload.user) {
          state.token = payload.token;
          state.user = payload.user;
          state.message = null;
          // persist
          setAuthToken(payload.token);
          try {
            localStorage.setItem("user", JSON.stringify(payload.user));
            localStorage.setItem("token", payload.token);
          } catch (e) {
            // ignore
          }
        } else if (payload.message) {
          // when OTP sent but not verified
          state.message = payload.message;
        } else {
          state.message = "Login response received";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // verifyEmail
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Verified";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Verification failed";
      })

      // resendOtp
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "OTP resent";
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Resend OTP failed";
      })

      // changePassword
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Password updated";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Password change failed";
      })

      // validateToken
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Token validation failed";
      })

      // forgotPassword
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Reset link sent";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Forgot password failed";
      })

      // validateResetToken
      .addCase(validateResetToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateResetToken.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Token valid";
      })
      .addCase(validateResetToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Reset token invalid";
      })

      // resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Password reset complete";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Reset password failed";
      })

      // fetchUserDetails
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        // return the user details; keep in state.user only if it's the current user
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch user failed";
      })

      // fetchUserEmailById
      .addCase(fetchUserEmailById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserEmailById.fulfilled, (state, action) => {
        state.loading = false;
        state.message = null;
        // Not overriding state.user, just store message or nothing. Consumers can read payload directly from thunk result.
      })
      .addCase(fetchUserEmailById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch user email failed";
      });
  },
});

export const { logout, clearError, clearMessage, setUserAndToken } =
  authSlice.actions;

export default authSlice.reducer;
