import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Terminal,
  ShieldCheck,
  Lock,
  Activity,
  AlertCircle,
  Eye,
  EyeOff,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.jpg";
import useAuth from "@/hooks/useAuth";
import { clearAuthState } from "@/store/auth";

/* ---------------------------------- */
/* Branding Panel */
/* ---------------------------------- */
const BrandingPanel = () => {
  const nav = useNavigate();

  return (
    <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#050505] border-r border-white/10 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-quantum-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <div
          className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
          onClick={() => nav("/login")}
        >
          <ArrowLeft size={14} /> Cancel Protocol
        </div>
      </div>

      <div className="relative z-10 text-center">
        <img
          src={logo}
          className="w-16 h-16 mx-auto mb-6 opacity-90 rounded-xl border border-white/10 bg-white/5 p-2 shadow-2xl"
        />
        <h1 className="text-4xl font-bold text-quantum-red mb-3 tracking-tight">
          Credential Update
        </h1>
        <p className="text-gray-400 max-w-sm mx-auto text-lg leading-relaxed">
          Securely overwrite existing access keys.
        </p>
      </div>

      <div className="relative z-10 bg-[#0A0A0A] border border-white/10 rounded-lg p-4 font-mono text-xs">
        <div className="flex justify-between items-center text-gray-500 border-b border-white/5 pb-2 mb-2">
          <span>SECURE_CHANNEL</span>
          <span className="text-green-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
            ACTIVE
          </span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>TOKEN_VALIDITY</span>
          <span className="text-white">VERIFIED</span>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------- */
/* Reset Form */
/* ---------------------------------- */
const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const {
    validateReset,
    resetUserPassword,
    clearAuthError,
    clearAuthMessage,
    error,
    validatingResetToken,
  } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- INFINITE LOOP FIX: Use a Ref to track execution ---
  const hasValidated = useRef(false);

  /* ---------------------------------- */
  /* Validate token ONCE on mount */
  /* ---------------------------------- */
  useEffect(() => {
    // 1. Guard Clause: If no token, redirect immediately
    if (!token) {
      navigate("/forgot-password");
      return;
    }

    // 2. Guard Clause: If already validated, STOP.
    if (hasValidated.current) return;

    // 3. Mark as validated immediately
    hasValidated.current = true;

    // 4. Fire Action
    clearAuthError();
    clearAuthMessage();
    validateReset({ token });

    // Cleanup on unmount only
    return () => {
      clearAuthError();
      clearAuthMessage();
    };
    // We intentionally leave out dependencies that change often (like functions)
    // to ensure this effect acts like componentDidMount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /* ---------------------------------- */
  /* Invalid token → redirect */
  /* ---------------------------------- */
  useEffect(() => {
    // Only redirect if validation is DONE and there is an error
    if (!validatingResetToken && error) {
      // Adding a small delay so user sees the error state briefly if needed,
      // or redirect immediately.
      const timer = setTimeout(() => navigate("/forgot-password"), 2000);
      return () => clearTimeout(timer);
    }
  }, [error, validatingResetToken, navigate]);

  /* ---------------------------------- */
  /* Handle reset */
  /* ---------------------------------- */
  const handleReset = async () => {
    setLocalError(null);

    if (!newPassword || !confirmPassword) {
      setLocalError("INPUT_ERROR: Both fields required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError("MATCH_ERROR: Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setLocalError("SECURITY_POLICY: Min 8 chars required");
      return;
    }

    try {
      setIsSubmitting(true);
      // We use await here assuming resetUserPassword returns a promise
      // (which it does via dispatch in useAuth)
      const result: any = await resetUserPassword({
        token: token!,
        password: newPassword,
      });

      if (result.error) {
        throw new Error(result.payload || "Reset failed");
      }

      // Success -> Redirect
      clearAuthState();
      navigate("/login");
    } catch (err: any) {
      setLocalError(
        typeof err === "string" ? err : "SYSTEM_ERROR: Reset failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------------------------- */
  /* Loading State */
  /* ---------------------------------- */
  if (validatingResetToken) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
        <Activity className="w-8 h-8 animate-spin text-quantum-red" />
        <div className="text-gray-500 font-mono text-sm animate-pulse">
          VALIDATING_SECURE_TOKEN...
        </div>
      </div>
    );
  }

  /* ---------------------------------- */
  /* Error State (Token Invalid) */
  /* ---------------------------------- */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full space-y-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-bold text-white">Access Denied</h2>
        <p className="text-gray-400 max-w-xs mx-auto">
          This token is invalid or has expired. Redirecting you...
        </p>
      </div>
    );
  }

  /* ---------------------------------- */
  /* Form */
  /* ---------------------------------- */
  return (
    <div className="w-full max-w-[400px] space-y-8">
      {/* Mobile Logo */}
      <div className="flex flex-col items-center lg:hidden mb-8">
        <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <img src={logo} alt="SpectraQ" className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">
          SpectraQ Terminal
        </h1>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            New Credentials
          </h1>
          <Badge
            variant="outline"
            className="border-red-500/20 bg-red-500/10 text-red-500 text-[10px] font-mono px-2 py-0.5"
          >
            <ShieldCheck className="w-3 h-3 mr-1" /> AUTHORIZED
          </Badge>
        </div>
        <p className="text-gray-400 text-sm text-left font-mono">
          Define a new secure access key.
        </p>
      </div>

      <div className="space-y-6">
        {/* New Password */}
        <div className="space-y-2">
          <Label className="text-xs font-mono text-gray-500 uppercase tracking-wider">
            New Password
          </Label>
          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-[#0A0A0A] border-white/10 text-white font-mono placeholder:text-gray-700 h-11 pl-9 pr-10 focus-visible:ring-0 focus-visible:border-white/30 transition-colors"
              placeholder="Enter new key"
            />
            <Key className="absolute left-3 top-3.5 h-4 w-4 text-gray-600" />
            <button
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-white transition-colors"
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label className="text-xs font-mono text-gray-500 uppercase tracking-wider">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-[#0A0A0A] border-white/10 text-white font-mono placeholder:text-gray-700 h-11 pl-9 pr-10 focus-visible:ring-0 focus-visible:border-white/30 transition-colors"
              placeholder="Confirm new key"
            />
            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-600" />
            <button
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-white transition-colors"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {localError && (
          <div className="p-3 rounded border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-mono flex items-start gap-2">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>{localError}</span>
          </div>
        )}

        <Button
          className="w-full h-11 bg-quantum-red text-black hover:bg-hover-red font-medium text-sm transition-all rounded-md"
          disabled={isSubmitting}
          onClick={handleReset}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 animate-spin" /> Updating Records...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Reset Credentials
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

/* ---------------------------------- */
/* Page Layout */
/* ---------------------------------- */
const ResetPassword = () => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-[#050505] text-foreground relative">
      <BrandingPanel />
      <div className="flex items-center justify-center min-h-screen bg-[#050505] relative px-6">
        {/* Mobile Background decoration */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-[#050505] -z-10" />
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
