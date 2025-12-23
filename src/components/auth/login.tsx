import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Terminal,
  ShieldCheck,
  Lock,
  Activity,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import logo from "@/assets/logo.jpg";
import { Badge } from "@/components/ui/badge";

// --- Left Panel: System Status Visualizer ---
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
          onClick={() => nav("/")}
        >
          <ArrowLeft size={14} />
          Return to Terminal
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

        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          SpectraQ <span className="text-gray-600">ID</span>
        </h1>

        <p className="text-gray-400 max-w-sm mx-auto text-lg leading-relaxed">
          Secure gateway to the decentralized prediction marketplace.
        </p>
      </div>

      {/* Bottom: Mock System Stats */}
      <div className="relative z-10">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 font-mono text-xs space-y-3">
          <div className="flex justify-between items-center text-gray-500 border-b border-white/5 pb-2">
            <span>SYSTEM_STATUS</span>
            <span className="text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
              ONLINE
            </span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>ENCRYPTION</span>
            <span className="text-white">AES-256-GCM</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>LATENCY</span>
            <span className="text-white">14ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Right Panel: Auth Form ---
const LoginForm = () => {
  const navigate = useNavigate();
  const {
    loginUser,
    loading,
    error,
    message,
    clearAuthError,
    clearAuthMessage,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

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

  const validate = () => {
    if (!email || !password) {
      setLocalError("CREDENTIALS_REQUIRED: Missing email or password");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setLocalError("FORMAT_ERROR: Invalid email syntax");
      return false;
    }
    if (password.length < 8) {
      setLocalError("SECURITY_ERROR: Password too short (<8 chars)");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLocalMessage(null);

    if (!validate()) return;

    setSubmitted(true);
    try {
      const action = await loginUser({ email: email.trim(), password });
      const payload = (action as any).payload;
      const rejected = (action as any).error;

      if (rejected) {
        const maybeError =
          (action as any).error?.message || "Authentication Failed";
        setLocalError(`AUTH_FAILURE: ${maybeError}`);
        setSubmitted(false);
        return;
      }

      if (payload?.message && !payload?.token) {
        try {
          localStorage.setItem("signup_email", email.trim());
        } catch {}
        navigate("/verify-email", { state: { email: email.trim() } });
        return;
      }

      if (payload?.token && payload?.user) {
        navigate("/");
        return;
      }

      setLocalMessage("SESSION_INIT: Access Granted");
    } catch (err: any) {
      setLocalError(`SYSTEM_ERROR: ${err?.message || "Unknown error"}`);
    } finally {
      setSubmitted(false);
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
              Authenticate
            </h1>
            <Badge
              variant="outline"
              className="border-green-500/20 bg-green-500/10 text-green-500 text-[10px] font-mono px-2 py-0.5"
            >
              <ShieldCheck className="w-3 h-3 mr-1" /> SECURE
            </Badge>
          </div>
          <p className="text-gray-400 text-sm">
            Enter credentials to access the trading layer.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
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
                  required
                  className="bg-[#0A0A0A] border-white/10 text-white font-mono placeholder:text-gray-700 h-11 focus-visible:ring-0 focus-visible:border-white/30 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-mono text-gray-500 uppercase tracking-wider"
                >
                  Password
                </Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  Recovery?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-[#0A0A0A] border-white/10 text-white font-mono placeholder:text-gray-700 h-11 focus-visible:ring-0 focus-visible:border-white/30 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
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
                <Terminal className="w-4 h-4 shrink-0" />
              )}
              <span className="mt-0.5">{localError || localMessage}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-11 bg-white text-black hover:bg-gray-200 font-medium text-sm transition-all rounded-md"
            disabled={loading || submitted}
          >
            {loading || submitted ? (
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 animate-spin" /> Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4" /> Sign In
              </span>
            )}
          </Button>
        </form>

        <div className="text-center">
          <div className="text-xs text-gray-500 font-mono mb-4">- OR -</div>
          <p className="text-sm text-gray-400">
            No access token?{" "}
            <Link
              to="/signup"
              className="text-white hover:underline decoration-white/30 underline-offset-4"
            >
              Initialize Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-[#050505] text-foreground">
      <BrandingPanel />
      <LoginForm />
    </div>
  );
};

export default Login;
