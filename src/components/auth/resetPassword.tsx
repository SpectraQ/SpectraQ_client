import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Terminal,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  LogIn,
  ShieldCheck,
  Lock,
  Key,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.jpg";
import api from "@/store/api/axiosConfig";

/* ---------------------------------- */
/* Branding Panel */
/* ---------------------------------- */
const BrandingPanel = () => {
  const nav = useNavigate();

  return (
    <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#050505] border-r border-white/10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-quantum-red/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <div
          className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono text-gray-500 hover:text-white transition-colors"
          onClick={() => nav("/login")}
        >
          <ArrowLeft size={14} /> Cancel Protocol
        </div>
      </div>

      <div className="relative z-10 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-xl border border-white/10 bg-quantum-red/5 p-2 flex items-center justify-center shadow-2xl">
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full object-contain opacity-90"
          />
        </div>
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
          <span>ENCRYPTION</span>
          <span className="text-white">AES-256-GCM</span>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------- */
/* Reset Password Form */
/* ---------------------------------- */
const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  // Local State
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // UI Feedback State
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------------------------- */
  /* Handle Reset (Direct API Call) */
  /* ---------------------------------- */
  const handleReset = async () => {
    setLocalError(null);

    // 1. Validation
    if (!newPassword || !confirmPassword) {
      setLocalError("INPUT_ERROR: Both fields are required");
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
      await api.post(`/reset-password/${token}`, { password: newPassword });

      // 3. Trigger Success UI
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Reset Failed:", err);
      const errorMsg =
        err?.response?.data?.error ||
        err.message ||
        "Reset failed. Token may be invalid.";
      setLocalError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------------------------- */
  /* SUCCESS UI STATE */
  /* ---------------------------------- */
  if (isSuccess) {
    return (
      <div className="w-full max-w-[400px] text-center space-y-8 animate-in fade-in zoom-in duration-300">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            System Updated
          </h1>
          <p className="text-gray-400">
            Your secure access keys have been reset successfully.
          </p>
        </div>

        {/* Status Box */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 font-mono text-xs text-left">
          <div className="flex justify-between border-b border-white/5 pb-2 mb-2">
            <span className="text-gray-500">OPERATION</span>
            <span className="text-white">CREDENTIAL_RESET</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">STATUS</span>
            <span className="text-green-500">READY_FOR_AUTH</span>
          </div>
        </div>

        <Button
          className="w-full h-11 bg-quantum-red text-white hover:bg-hover-red transition-all font-medium"
          onClick={() => navigate("/login")}
        >
          <span className="flex items-center justify-center gap-2">
            <LogIn size={16} /> Return to Login
          </span>
        </Button>
      </div>
    );
  }

  /* ---------------------------------- */
  /* FORM UI STATE */
  /* ---------------------------------- */
  return (
    <div className="w-full max-w-[400px] space-y-8">
      {/* Mobile Header */}
      <div className="lg:hidden text-center mb-8">
        <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-quantum-red/5 border border-white/10 flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-8 h-8 opacity-90" />
        </div>
        <h1 className="text-2xl font-bold text-white">SpectraQ Terminal</h1>
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
        <p className="text-gray-400 text-sm font-mono">
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
              className="absolute right-3 top-3.5 text-gray-500 hover:text-white transition-colors"
              onClick={() => setShowNew(!showNew)}
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
              className="absolute right-3 top-3.5 text-gray-500 hover:text-white transition-colors"
              onClick={() => setShowConfirm(!showConfirm)}
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
          className="w-full h-11 bg-quantum-red text-white hover:bg-hover-red transition-all font-medium"
          onClick={handleReset}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Activity className="w-4 h-4 animate-spin" /> Updating Records...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
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
    <div className="min-h-screen lg:grid lg:grid-cols-2 bg-[#050505] text-foreground relative">
      <BrandingPanel />
      <div className="flex items-center justify-center px-6 min-h-screen lg:min-h-auto">
        {/* Mobile Background decoration */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-[#050505] -z-10" />
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
