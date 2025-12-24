import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Terminal,
  ShieldCheck,
  UserPlus,
  Activity,
  AlertCircle,
  Hash,
  Mail,
  Smartphone,
  Key,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import logo from "@/assets/logo.jpg";
import { Badge } from "@/components/ui/badge";

type FormState = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  mobileNumber: string;
  password: string;
  role?: string;
};

// --- Left Panel: System Status Visualizer (Identical to Login) ---
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
          Return to base
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
          SpectraQ
        </h1>

        <p className="text-gray-400 max-w-sm mx-auto text-lg leading-relaxed">
          Initialize your trading identity. Secure access to intelligent hedging
          protocols.
        </p>
      </div>

      {/* Bottom: Mock System Stats */}
      <div className="relative z-10">
        <div className="bg-[#0A0A0A] border border-white/10 rounded-lg p-4 font-mono text-xs space-y-3">
          <div className="flex justify-between items-center text-gray-500 border-b border-white/5 pb-2">
            <span>REGISTRATION_GATEWAY</span>
            <span className="text-green-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />{" "}
              OPEN
            </span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>PROTOCOL</span>
            <span className="text-white">TLS 1.3</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>CAPACITY</span>
            <span className="text-white">OPTIMAL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Right Panel: Signup Form ---
const SignupForm = () => {
  const navigate = useNavigate();
  const {
    registerUser,
    loading,
    error,
    message,
    clearAuthError,
    clearAuthMessage,
  } = useAuth();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const [localError, setLocalError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    clearAuthError();
    clearAuthMessage();
  }, [clearAuthError, clearAuthMessage]);

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setLocalError(null);
  };

  const validate = () => {
    const { firstName, lastName, username, email, mobileNumber, password } =
      form;
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !mobileNumber ||
      !password
    ) {
      setLocalError("DATA_MISSING: All fields required");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setLocalError("FORMAT_INVALID: Email syntax incorrect");
      return false;
    }
    if (!/^\+?\d{7,15}$/.test(mobileNumber)) {
      setLocalError("FORMAT_INVALID: Mobile number syntax incorrect");
      return false;
    }
    if (password.length < 8) {
      setLocalError("SECURITY_POLICY: Password min length 8 chars");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!validate()) {
      return;
    }

    setSubmitted(true);
    try {
      const payload = {
        email: form.email.trim(),
        password: form.password,
        mobileNumber: form.mobileNumber.trim(),
        username: form.username.trim(),
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
      };

      const resultAction = await registerUser(payload as any);

      if ((resultAction as any).error) {
        const maybeError =
          (resultAction as any).error?.message || "Registration failed";
        setLocalError(`SYSTEM_REJECT: ${maybeError}`);
        setSubmitted(false);
        return;
      }

      try {
        localStorage.setItem("email", form.email.trim());
      } catch (err) {
        console.warn("Failed to persist signup email", err);
      }

      navigate("/verify-email", { state: { email: form.email } });
    } catch (err: any) {
      setLocalError(`FATAL_ERROR: ${err?.message || "Unknown error"}`);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] relative px-6 py-12">
      {/* Mobile Background decoration */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-[#050505] -z-10" />

      <div className="mx-auto w-full max-w-[420px] space-y-8">
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
            <h1 className="text-2xl font-bold text-quantum-red tracking-tight">
              Initialize ID
            </h1>
            <Badge
              variant="outline"
              className="border-green-500/20 bg-green-500/10 text-green-500 text-[10px] font-mono px-2 py-0.5"
            >
              <UserPlus className="w-3 h-3 mr-1" /> NEW_USER
            </Badge>
          </div>
          <p className="text-gray-400 text-sm text-left">
            Create new credentials for trading access.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Row 1: Names */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-xs font-mono text-gray-500 uppercase tracking-wider"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="Max"
                required
                className="bg-[#0A0A0A] border-white/10 text-white font-mono placeholder:text-gray-700 h-10 focus-visible:ring-0 focus-visible:border-white/30"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-xs font-mono text-gray-500 uppercase tracking-wider"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Robinson"
                required
                className="bg-[#0A0A0A] border-white/10 text-white font-mono placeholder:text-gray-700 h-10 focus-visible:ring-0 focus-visible:border-white/30"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 2: Username */}
          <div className="space-y-2">
            <Label
              htmlFor="username"
              className="text-xs font-mono text-gray-500 uppercase tracking-wider"
            >
              Username Handle
            </Label>
            <div className="relative">
              <Input
                id="username"
                type="text"
                placeholder="max_robinson"
                required
                className="bg-[#0A0A0A] border-white/10 text-white font-mono placeholder:text-gray-700 h-10 pl-9 focus-visible:ring-0 focus-visible:border-white/30"
                value={form.username}
                onChange={handleChange}
              />
              <Hash className="absolute left-3 top-2.5 h-4 w-4 text-gray-600" />
            </div>
          </div>

          {/* Row 3: Email */}
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
                placeholder="name@example.com"
                required
                className="bg-[#0A0A0A] border-white/10 text-white font-mono placeholder:text-gray-700 h-10 pl-9 focus-visible:ring-0 focus-visible:border-white/30"
                value={form.email}
                onChange={handleChange}
              />
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-600" />
            </div>
          </div>

          {/* Row 4: Mobile */}
          <div className="space-y-2">
            <Label
              htmlFor="mobileNumber"
              className="text-xs font-mono text-gray-500 uppercase tracking-wider"
            >
              Mobile Contact
            </Label>
            <div className="relative">
              <Input
                id="mobileNumber"
                type="tel"
                placeholder="+1234567890"
                required
                className="bg-[#0A0A0A] border-white/10 text-white font-mono placeholder:text-gray-700 h-10 pl-9 focus-visible:ring-0 focus-visible:border-white/30"
                value={form.mobileNumber}
                onChange={handleChange}
              />
              <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-gray-600" />
            </div>
          </div>

          {/* Row 5: Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-xs font-mono text-gray-500 uppercase tracking-wider"
            >
              Password Key
            </Label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                required
                className="bg-[#0A0A0A] border-white/10 text-white font-mono placeholder:text-gray-700 h-10 pl-9 focus-visible:ring-0 focus-visible:border-white/30"
                value={form.password}
                onChange={handleChange}
              />
              <Key className="absolute left-3 top-2.5 h-4 w-4 text-gray-600" />
            </div>
          </div>

          {/* Logs / Feedback Area */}
          {(localError || message) && (
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
              <span className="mt-0.5">{localError || message}</span>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-11 bg-quantum-red text-white hover:bg-red-700 font-medium text-sm transition-all rounded-md"
            disabled={loading || submitted}
          >
            {loading || submitted ? (
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4 animate-spin" /> Processing
                Identity...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> Create Identity
              </span>
            )}
          </Button>
        </form>

        <div className="text-center">
          <div className="text-xs text-gray-500 font-mono mb-4">- OR -</div>
          <p className="text-sm text-gray-400">
            Existing identity found?{" "}
            <Link
              to="/login"
              className="text-quantum-red hover:underline decoration-white/30 underline-offset-4"
            >
              Authenticate Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const Signup = () => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-[#050505] text-foreground relative">
      <BrandingPanel />
      <SignupForm />
    </div>
  );
};

export default Signup;
