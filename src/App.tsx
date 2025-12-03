import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home(401)/home";
import Dashboard from "./pages/home/dashboard";
import LoginPage from "./pages/auth/loginPage";
import SignupPage from "./pages/auth/signupPage";
import EmailVerifyPage from "./pages/auth/emailVerifyPage";
import ResetPasswordPage from "./pages/auth/resetPasswordPage";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage";
import CheckAuth from "./components/auth/checkAuth";
import CommunitiesPage from "./pages/home/communities";
import CommunityInfo from "./components/home/communities/communityInfo";
import DashboardPage from "./pages/home/dashboard";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { setAuthToken } from "./store/api/axiosConfig";
import { LiveMarket } from "./pages/home/markets";
import Agent from "./pages/home/agent";

function App() {
  const auth = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthToken(null);
    }
  }, [auth]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth>
              <Home />
            </CheckAuth>
          }
        />
        <Route
          path="/signup"
          element={
            <CheckAuth>
              <SignupPage />
            </CheckAuth>
          }
        />
        <Route
          path="/login"
          element={
            <CheckAuth>
              <LoginPage />
            </CheckAuth>
          }
        />
        <Route
          path="/verify-email"
          element={
            <CheckAuth>
              <EmailVerifyPage />
            </CheckAuth>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <CheckAuth>
              <ForgotPasswordPage />
            </CheckAuth>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <CheckAuth>
              <ResetPasswordPage />
            </CheckAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <CheckAuth>
              <DashboardPage />
            </CheckAuth>
          }
        />
        <Route
          path="/communities"
          element={
            <CheckAuth>
              <CommunitiesPage />
            </CheckAuth>
          }
        />
        <Route
          path="/communities/:communityName"
          element={
            <CheckAuth>
              <CommunityInfo />
            </CheckAuth>
          }
        />
        <Route
          path="/markets"
          element={
            <CheckAuth>
              <LiveMarket />
            </CheckAuth>
          }
        />
        <Route
          path="/portfolio"
          element={
            <CheckAuth>
              <Dashboard />
            </CheckAuth>
          }
        />
        <Route
          path="/agent"
          element={
            <CheckAuth>
              <Agent />
            </CheckAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
