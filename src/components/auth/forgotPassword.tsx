import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Terminal,
  ShieldAlert,
  KeyRound,
  Mail,
  Activity,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import logo from "@/assets/logo.jpg";
import { Badge } from "@/components/ui/badge";

// --- Left Panel: System Status (Reused for Consistency) ---
const BrandingPanel = () => {
  const nav = useNavigate();

  return (
    <div className="relative hidden lg:flex flex-col justify-between p-12 bg-[#050505] border-r border-white/10 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-quantum-red/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top: Navigation */}
      <div className="relative z-10">
        <div
          className="inline-flex items-center gap-2 cursor-pointer text-xs font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
          onClick={() => nav("/login")}
        >
          <ArrowLeft size={14} />
          Back to Authentication
        </div>
      </div>

      {/* Middle: Brand Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-2xl">
          <img
            src={logo}
            alt="SpectraQ Logo"
            className="w-10 h-10 object-contain opacity-90"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-quantum-red tracking-tight mb-4">
          Account Recovery
        </h1>

        <p className="text-gray-400 max-w-sm mx-auto text-lg leading-relaxed">
          Secure protocol for credential restoration.
        </p>
      </div>

      {/* Bottom: Mock System Stats */}
      <div className="relative z-10">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 font-mono text-xs space-y-3">
          <div className="flex justify-between items-center text-gray-500 border-b border-white/5 pb-2">
            <span>RECOVERY_MODULE</span>
            <span className="text-yellow-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />{" "}
              STANDBY
            </span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>SECURITY</span>
            <span className="text-white">2FA_READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Right Panel: Form ---
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    forgotUserPassword,
    loading,
    error,
    message,
    clearAuthError,
    clearAuthMessage,
  } = useAuth();

  useEffect(() => {
    clearAuthError();
    clearAuthMessage();
  }, [clearAuthError, clearAuthMessage]);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  useEffect(() => {
    if (message) setLocalMessage(message);
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior if triggered
    setLocalError(null);
    setLocalMessage(null);

    if (!email) {
      setLocalError("INPUT_REQUIRED: Email address missing");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("FORMAT_INVALID: Email syntax incorrect");
      return;
    }

    setSubmitting(true);
    try {
      const action = await forgotUserPassword({ email: email.trim() });
      const payload = (action as any).payload;

      try {
        localStorage.setItem("reset_email", email.trim());
      } catch {}

      setLocalMessage(
        payload?.message || "LINK_SENT: Redirecting to verification..."
      );
    } catch (err: any) {
      setLocalError(
        typeof err === "string"
          ? `SYSTEM_ERROR: ${err}`
          : `SYSTEM_ERROR: ${err?.message || "Failed to send reset email"}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] relative px-6">
      {/* Mobile Background decoration */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-[#050505] -z-10" />

      <div className="mx-auto w-full max-w-[400px] space-y-8">
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
              Reset Credentials
            </h1>
            <Badge
              variant="outline"
              className="border-yellow-500/20 bg-yellow-500/10 text-yellow-500 text-[10px] font-mono px-2 py-0.5"
            >
              <ShieldAlert className="w-3 h-3 mr-1" /> RECOVERY
            </Badge>
          </div>
          <p className="text-gray-400 text-sm text-left">
            Enter your registered email to receive a secure reset link.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-mono text-gray-500 uppercase tracking-wider"
            >
              Email Address
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="user@spectraq.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0A0A0A] border-white/10 text-white font-mono placeholder:text-gray-700 h-11 pl-9 focus-visible:ring-0 focus-visible:border-white/30 transition-colors"
              />
              <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-600" />
            </div>
          </div>

          {/* Logs / Feedback Area */}
          {(localError || localMessage) && (
            <div
              className={`p-3 rounded border text-xs font-mono flex items-start gap-2 ${
                localError
                  ? "bg-red-500/10 border-red-500/20 text-red-400"
                  : "bg-green-500/10 border-green-500/20 text-green-400"
              }`}
            >
              {localError ? (
                <AlertCircle className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              )}
              <span className="mt-0.5">{localError || localMessage}</span>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className="w-full h-11 bg-quantum-red text-white hover:bg-red-700 font-medium text-sm transition-all rounded-md"
            disabled={loading || submitting}
          >
            {loading || submitting ? (
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 animate-spin" /> Processing
                Request...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <KeyRound className="w-4 h-4" /> Send Reset Link
              </span>
            )}
          </Button>

          <div className="text-center pt-2">
            <div className="text-xs text-gray-500 font-mono mb-4">- OR -</div>
            <p className="text-sm text-gray-400">
              Remembered your credentials?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-white hover:underline decoration-white/30 underline-offset-4 cursor-pointer"
              >
                Return to Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForgotPassword = () => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-[#050505] text-foreground relative">
      <BrandingPanel />
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
