import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Terminal, Activity } from "lucide-react"; // Added icons for the loader
import useAuth from "@/hooks/useAuth";
import Layout from "../home/common/layout";

interface CheckAuthProps {
  children: React.ReactNode;
}

const CheckAuth: React.FC<CheckAuthProps> = ({ children }) => {
  const location = useLocation();

  const {
    token: authToken,
    isAuthenticated,
    loading,
    validateAuthToken,
  } = useAuth();

  const effectivelyAuthenticated = isAuthenticated || !!authToken;

  useEffect(() => {
    if (!isAuthenticated && authToken) {
      validateAuthToken({ token: authToken });
    }
  }, [authToken, isAuthenticated, validateAuthToken]);

  // --- 1. Terminal-Style Loading State ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505]">
        <div className="flex items-center gap-2 text-green-500 font-mono text-sm animate-pulse">
          <Terminal className="w-4 h-4" />
          <span>_INITIALIZING_GATEWAY...</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-gray-500 font-mono text-xs">
          <Activity className="w-3 h-3 animate-spin" />
          <span>VERIFYING_SESSION_TOKEN</span>
        </div>
      </div>
    );
  }

  const pathname = location.pathname;

  // --- 2. Public Route Logic ---
  // These routes can be accessed without being logged in
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-email",
  ];

  // Logic to check if the current path is public
  // We explicitly check for startsWith to handle dynamic params (e.g., /reset-password/abc-123)
  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/reset-password/") ||
    pathname.startsWith("/verify-email");

  // --- 3. Unauthenticated User Logic ---
  if (!effectivelyAuthenticated) {
    // If it's a public route (like reset password), allow access
    if (isPublicRoute) {
      return <>{children}</>;
    }
    // Otherwise, redirect to login
    return <Navigate to="/login" replace />;
  }

  // --- 4. Authenticated User Logic ---
  // If user is logged in, prevent them from seeing auth pages
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/reset-password/") // Logged in users shouldn't need to reset via token
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  const protectedPaths = [
    "/dashboard",
    "/communities",
    "/markets",
    "/portfolio",
    "/agent",
    "/charts",
  ];

  // Allow access to protected paths if logged in
  const isProtectedPath = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtectedPath) {
    return <Layout>{children}</Layout>;
  }

  // Default fallback
  return <Navigate to="/dashboard" replace />;
};

export default CheckAuth;
