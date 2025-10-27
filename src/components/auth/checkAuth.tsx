import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const pathname = location.pathname;

  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-email",
  ];

  const isPublicRoute =
    publicRoutes.includes(pathname) || pathname.startsWith("/reset-password/");

  if (!effectivelyAuthenticated) {
    if (isPublicRoute) {
      return <>{children}</>;
    }
    return <Navigate to="/login" replace />;
  }

  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  const protectedPaths = [
    "/dashboard",
    "/communities",
    "/markets",
    "/portfolio",
  ];
  const isProtectedPath = protectedPaths.some((p) => pathname.startsWith(p));

  if (isProtectedPath) {
    return <Layout>{children}</Layout>;
  }

  return <Navigate to="/dashboard" replace />;
};

export default CheckAuth;
